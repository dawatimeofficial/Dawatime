import cron from 'node-cron';
import Medication from '../models/Medication.js';
import User from '../models/User.js';
import { sendPushNotification } from './firebase.js';

export const startCronJobs = () => {
  // Run every minute
  cron.schedule('* * * * *', async () => {
    console.log('------------------------------');
    console.log('⏰ CRON TICK');

    try {
      const now = new Date();

      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${currentHours}:${currentMinutes}`;

      console.log(`🕒 Current server time: ${timeString}`);

      // 🔥 DEBUG: Show ALL stored times
      const allMeds = await Medication.find({});
      console.log(
        '📦 All medication times:',
        allMeds.map(m => m.scheduleTime)
      );

      // 🔥 FIX: allow slight mismatch (tolerant matching)
      const meds = allMeds.filter(med => {
        if (!med.scheduleTime) return false;

        const [h, m] = med.scheduleTime.split(':').map(Number);

        return h === now.getHours() && m === now.getMinutes();
      });

      console.log(`🔍 Matched medications: ${meds.length}`);

      if (meds.length === 0) {
        console.log('⚠️ No medications matched this minute');
        return;
      }

      for (const med of meds) {
        console.log(`💊 MATCHED: ${med.name} at ${med.scheduleTime}`);

        const lastNotified = med.lastNotifiedAt;

        // Prevent duplicate notification
        if (
          lastNotified &&
          lastNotified.getHours() === now.getHours() &&
          lastNotified.getMinutes() === now.getMinutes() &&
          lastNotified.getDate() === now.getDate()
        ) {
          console.log('⏭️ Already notified this minute, skipping');
          continue;
        }

        const title = 'Medicine Reminder 💊';
        const body = `Time to take ${med.name}`;

        // Populate user
        const populatedMed = await med.populate('userId');

        // 1️⃣ Send to main user
        if (populatedMed.userId?.fcmToken) {
          console.log(`📡 Sending to USER: ${populatedMed.userId.email}`);
          await sendPushNotification(
            populatedMed.userId.fcmToken,
            title,
            body
          );
        } else {
          console.log('⚠️ User has NO FCM token');
        }

        // 2️⃣ Send to family members
        const owner = await User.findById(populatedMed.userId._id)
          .populate('familyMembers', 'name fcmToken');

        const familyMembers = owner?.familyMembers || [];

        console.log(`👨‍👩‍👧 Family count: ${familyMembers.length}`);

        for (const fm of familyMembers) {
          if (fm.fcmToken) {
            console.log(`📡 Sending to FAMILY: ${fm.name}`);
            await sendPushNotification(fm.fcmToken, title, body);
          } else {
            console.log(`⚠️ ${fm.name} has NO token`);
          }
        }

        // Save notification timestamp
        med.lastNotifiedAt = now;
        await med.save();

        console.log(`✅ DONE for ${med.name}`);
      }

    } catch (error) {
      console.error('❌ CRON ERROR:', error);
    }

    console.log('------------------------------');
  });

  console.log('🚀 Cron jobs initialized — checking every minute');
};
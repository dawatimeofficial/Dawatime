import cron from 'node-cron';
import Medication from '../models/Medication.js';
import User from '../models/User.js';
import { sendPushNotification } from './firebase.js';

export const startCronJobs = () => {
  // Check every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${currentHours}:${currentMinutes}`;

      // Find medications matching the current time
      const meds = await Medication.find({ scheduleTime: timeString })
        .populate('userId');

      if (meds.length > 0) {
        console.log(`⏰ [${timeString}] Found ${meds.length} medication(s) due`);
      }

      for (const med of meds) {
        // Prevent duplicate notification in the same minute
        const lastNotified = med.lastNotifiedAt;
        if (lastNotified &&
          lastNotified.getHours() === now.getHours() &&
          lastNotified.getMinutes() === now.getMinutes() &&
          lastNotified.getDate() === now.getDate() &&
          lastNotified.getMonth() === now.getMonth() &&
          lastNotified.getFullYear() === now.getFullYear()) {
          continue;
        }

        const title = 'Medicine Reminder';
        const body = `Time to take ${med.name}`;

        console.log(`💊 Medication matched: ${med.name} (${med.dosage})`);

        // 1. Send to main user
        if (med.userId && med.userId.fcmToken) {
          console.log(`📡 Sending to user: ${med.userId.email}`);
          await sendPushNotification(med.userId.fcmToken, title, body);
        } else {
          console.log(`⚠️ User has no FCM token, skipping`);
        }

        // 2. Send to ALL family members (from User.familyMembers)
        const owner = await User.findById(med.userId._id).populate('familyMembers', 'name fcmToken');
        const familyMembers = owner?.familyMembers || [];

        if (familyMembers.length > 0) {
          console.log(`👨‍👩‍👧 Found ${familyMembers.length} family member(s)`);

          for (const fm of familyMembers) {
            if (fm.fcmToken) {
              console.log(`📡 Sending to family: ${fm.name}`);
              await sendPushNotification(fm.fcmToken, title, body);
            } else {
              console.log(`⚠️ Family member ${fm.name} has no FCM token, skipping`);
            }
          }
        }

        // Update lastNotifiedAt to prevent duplicates
        med.lastNotifiedAt = now;
        await med.save();
        console.log(`✅ Notifications sent for ${med.name}`);
      }
    } catch (error) {
      console.error('❌ Cron job error:', error);
    }
  });

  console.log('🚀 Cron jobs initialized — checking every minute');
};

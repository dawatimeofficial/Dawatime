import cron from 'node-cron';
import Medication from '../models/Medication.js';
import User from '../models/User.js';
import FamilyMember from '../models/FamilyMember.js';
import { sendPushNotification } from './firebase.js';

export const startCronJobs = () => {
  // Check every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      // Assume scheduleTime is in HH:mm format
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${currentHours}:${currentMinutes}`;
      
      // Get medications that match the schedule time
      const meds = await Medication.find({ scheduleTime: timeString })
        .populate('userId')
        .populate('familyMemberIds');

      for (const med of meds) {
        // Prevent duplicate notification in the same minute (or same day for this schedule)
        const lastNotified = med.lastNotifiedAt;
        if (lastNotified && 
            lastNotified.getHours() === now.getHours() && 
            lastNotified.getMinutes() === now.getMinutes() && 
            lastNotified.getDate() === now.getDate() && 
            lastNotified.getMonth() === now.getMonth() && 
            lastNotified.getFullYear() === now.getFullYear()) {
          continue; // Already notified for this exact scheduled time slot
        }

        const title = "Medication Reminder";
        const body = `It's time to take ${med.name} (${med.dosage}).`;

        // Send to User
        if (med.userId && med.userId.fcmToken) {
          await sendPushNotification(med.userId.fcmToken, title, body);
        }

        // Send to Family Members
        if (med.familyMemberIds && med.familyMemberIds.length > 0) {
          for (const familyMember of med.familyMemberIds) {
            if (familyMember.fcmToken) {
              const fmBody = `${med.userId.name} needs to take ${med.name} (${med.dosage}).`;
              await sendPushNotification(familyMember.fcmToken, title, fmBody);
            }
          }
        }

        // Update lastNotifiedAt
        med.lastNotifiedAt = now;
        await med.save();
      }
    } catch (error) {
      console.error('Error in medication cron job:', error);
    }
  });
  console.log('Cron jobs initialized successfully.');
};

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Load service account (make sure service-account.json is in the root of the backend directory)
try {
  const serviceAccount = JSON.parse(
    readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../service-account.json'), 'utf8')
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.warn('Firebase Admin setup skipped or failed (service-account.json may be missing).');
}

export const sendPushNotification = async (token, title, body) => {
  if (!token) return;
  try {
    await admin.messaging().send({
      token,
      notification: { title, body },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          channelId: 'medication_reminders',
        },
      },
    });
    console.log(`Push notification sent to ${token.substring(0, 10)}...`);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

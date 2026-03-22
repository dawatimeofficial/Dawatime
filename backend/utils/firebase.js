import admin from 'firebase-admin';

// Initialize Firebase Admin using environment variable (JSON string)
if (!admin.apps.length) {
  try {
    const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!serviceAccountJSON) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set.');
    }

    const serviceAccount = JSON.parse(serviceAccountJSON);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.warn('Firebase Admin setup failed:', error.message);
  }
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

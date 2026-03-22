import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { saveFcmToken, getToken } from '../api/index.js';

let isRegistered = false;

export const registerPushNotifications = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.log('❌ Not native platform');
    return;
  }

  if (isRegistered) {
    console.log('⚠️ Already registered');
    return;
  }

  try {
    console.log('🚀 Starting push setup...');

    // Request permission
    const permStatus = await PushNotifications.requestPermissions();

    if (permStatus.receive !== 'granted') {
      console.log('❌ Permission denied');
      return;
    }

    console.log('✅ Permission granted');

    // 🔥 LISTENERS FIRST
    PushNotifications.addListener('registration', async (token) => {
      console.log('🔥 FCM TOKEN:', token.value);

      const trySaveToken = async (retry = 0) => {
        const authToken = getToken();

        if (!authToken) {
          if (retry < 5) {
            console.log('⏳ Waiting for auth token...');
            setTimeout(() => trySaveToken(retry + 1), 1500);
          } else {
            console.log('❌ Auth token not found, skipping FCM save');
          }
          return;
        }

        try {
          console.log('📡 Sending token to backend...');
          await saveFcmToken(token.value);
          console.log('✅ Token saved to backend');
        } catch (err) {
          console.error('❌ Failed to save token:', err);
        }
      };

      trySaveToken();
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('❌ Registration error:', error);
    });

    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('📩 Notification received:', notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('👉 Notification clicked:', notification);
    });

    // 🔥 REGISTER
    await PushNotifications.register();

    isRegistered = true;

  } catch (error) {
    console.error('❌ Push setup error:', error);
  }
};
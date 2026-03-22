import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

/**
 * Register for native push notifications via Capacitor.
 * Only runs on native platforms (Android/iOS), silently no-ops on web.
 * @param {(token: string) => void} onToken - callback that receives the FCM token
 */
export const registerPushNotifications = async (onToken) => {
  // Only run on native platforms
  if (!Capacitor.isNativePlatform()) {
    console.log('Push notifications only supported on native platforms.');
    return;
  }

  try {
    // Request permission
    const permStatus = await PushNotifications.requestPermissions();
    if (permStatus.receive !== 'granted') {
      console.warn('Push notification permission not granted.');
      return;
    }

    // Register with FCM
    await PushNotifications.register();

    // Listen for the registration token
    PushNotifications.addListener('registration', (token) => {
      console.log('FCM Token received:', token.value);
      if (onToken) onToken(token.value);
    });

    // Handle registration errors
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error:', error);
    });

    // Handle incoming notifications while app is open
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received:', notification);
    });

    // Handle notification tap (app opened from notification)
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push notification action performed:', notification);
    });

  } catch (error) {
    console.error('Error setting up push notifications:', error);
  }
};

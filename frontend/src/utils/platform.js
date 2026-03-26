import { Capacitor } from '@capacitor/core';

export const isMobileApp = Capacitor.isNativePlatform();

export const platform = isMobileApp ? 'mobile' : 'web';

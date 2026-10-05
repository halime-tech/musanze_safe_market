export const APP_CONFIG = {
  groupCode: 'Musanze Safe Market',
  appName: 'Musanze Safe Market',
  appVersion: '1.0.0',
  pilotName: 'Musanze Safe Markets Pilot',
  stallCodePattern: /^MUS-\d{3}$/,
  phonePattern: /^07[2389]\d{7}$/,
  maxImageSize: 5 * 1024 * 1024, // 5MB
} as const;
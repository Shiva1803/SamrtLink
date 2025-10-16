// Application Constants
export const APP_NAME = 'SmartLink';

export const ROUTES = {
  HOME: 'home',
  FEATURES: 'features',
  PRICING: 'pricing',
  ABOUT: 'about',
  CONTACT: 'contact',
  SIGN_IN: 'signin',
  SIGN_UP: 'signup',
  DASHBOARD: 'dashboard',
  SETTINGS: 'settings',
  PROFILE: 'profile',
  ADMIN_LOGIN: 'admin-login',
  ADMIN: 'admin',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'theme',
} as const;

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const MESSAGES = {
  SUCCESS: {
    LINK_CREATED: 'Link created successfully!',
    LINK_DELETED: 'Link deleted successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    SIGN_IN: 'Welcome back!',
    SIGN_UP: 'Account created successfully!',
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please sign in to continue.',
  },
} as const;


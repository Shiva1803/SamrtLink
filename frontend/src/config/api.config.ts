// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  ENDPOINTS: {
    // Auth
    SIGN_IN: '/api/auth/signin',
    SIGN_UP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',

    // Links
    LINKS: '/api/links',
    CREATE_LINK: '/api/links/create',
    DELETE_LINK: (id: string) => `/api/links/${id}`,
    UPDATE_LINK: (id: string) => `/api/links/${id}`,

    // Analytics
    ANALYTICS: (linkId: string) => `/api/analytics/${linkId}`,

    // Profile
    PROFILE: '/api/profile',
    UPDATE_PROFILE: '/api/profile/update',

    // Chat (token-based)
    CHAT_MESSAGE: '/api/chat',
    // Legacy chat by userId
    CHAT: (userId: string) => `/api/chat/${userId}`,
    
    // --- Add Admin Endpoints ---
    ADMIN_USERS: '/api/admin/users',
    ADMIN_USER_DETAIL: (id: string) => `/api/admin/users/${id}`,
  },
  TIMEOUT: 10000,
};

export default API_CONFIG;

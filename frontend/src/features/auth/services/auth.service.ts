// Authentication Service
import { apiClient } from '@/lib/api';
import { API_CONFIG } from '@/config/api.config';
import { STORAGE_KEYS } from '@/config/constants';
import type { SignInCredentials, SignUpCredentials, AuthResponse, User } from '@/types/auth.types';

export const authService = {
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.SIGN_IN,
      credentials
    );

    // Store token and user data
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

    return response;
  },

  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.SIGN_UP,
      credentials
    );

    // Store token and user data
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

    return response;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getStoredToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};

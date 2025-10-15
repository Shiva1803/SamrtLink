// API Client with proper error handling
import { API_CONFIG } from '@/config/api.config';
import { STORAGE_KEYS } from '@/config/constants';

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  private getHeaders(requiresAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, requiresAuth = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(requiresAuth),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, requiresAuth = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(requiresAuth),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown, requiresAuth = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(requiresAuth),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, requiresAuth = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(requiresAuth),
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();

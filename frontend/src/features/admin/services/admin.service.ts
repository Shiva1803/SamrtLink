import { apiClient } from '@/lib/api';
import { User } from '@/types/auth.types';
import { Link as AdminLink } from '@/types/link.types';

// Define a type for the detailed user view
export interface AdminUserDetail {
  user: User;
  links: AdminLink[];
}

export const adminService = {
  /**
   * Fetches all users. Requires admin authentication.
   */
  async getAllUsers(): Promise<User[]> {
    // True indicates that this request requires authentication
    const users = await apiClient.get<User[]>('/api/admin/users', true);
    return users;
  },

  /**
   * Fetches all links. Requires admin authentication.
   */
  async getAllLinks(): Promise<AdminLink[]> {
    // True indicates that this request requires authentication
    return apiClient.get<AdminLink[]>('/api/admin/links', true);
  },

  /**
   * Fetches a single user's details and their links. Requires admin authentication.
   */
  async getUserDetails(userId: string): Promise<AdminUserDetail> {
    return apiClient.get<AdminUserDetail>(`/api/admin/users/${userId}`, true);
  },
};
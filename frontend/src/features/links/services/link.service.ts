// Link Management Service
import { apiClient } from '@/lib/api';
import { API_CONFIG } from '@/config/api.config';
import type { Link, CreateLinkRequest, UpdateLinkRequest } from '@/types/link.types';

export const linkService = {
  async getLinks(): Promise<Link[]> {
    return apiClient.get<Link[]>(API_CONFIG.ENDPOINTS.LINKS, true);
  },

  async createLink(data: CreateLinkRequest): Promise<Link> {
    return apiClient.post<Link>(API_CONFIG.ENDPOINTS.CREATE_LINK, data, true);
  },

  async updateLink(id: string, data: UpdateLinkRequest): Promise<Link> {
    return apiClient.put<Link>(API_CONFIG.ENDPOINTS.UPDATE_LINK(id), data, true);
  },

  async deleteLink(id: string): Promise<{ success: boolean }> {
    return apiClient.delete<{ success: boolean }>(
      API_CONFIG.ENDPOINTS.DELETE_LINK(id),
      true
    );
  },

  async getLink(id: string): Promise<Link> {
    return apiClient.get<Link>(`${API_CONFIG.ENDPOINTS.LINKS}/${id}`, true);
  },
};

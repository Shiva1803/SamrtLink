// Analytics Service
import { apiClient } from '@/lib/api';
import { API_CONFIG } from '@/config/api.config';
import type { AnalyticsData } from '@/types/analytics.types';

export const analyticsService = {
  async getAnalytics(linkId: string): Promise<AnalyticsData> {
    return apiClient.get<AnalyticsData>(
      API_CONFIG.ENDPOINTS.ANALYTICS(linkId),
      true
    );
  },

  async getDashboardStats(): Promise<{
    totalClicks: number;
    totalLinks: number;
    uniqueVisitors: number;
    conversionRate: number;
  }> {
    return apiClient.get('/api/analytics/dashboard', true);
  },
};

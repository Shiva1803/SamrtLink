// Custom hook for analytics
import { useState, useCallback } from 'react';
import { analyticsService } from '@/features/analytics/services/analytics.service';
import type { AnalyticsData } from '@/types/analytics.types';
import { toast } from 'sonner';
import { MESSAGES } from '@/config/constants';

export function useAnalytics(linkId?: string) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const analyticsData = await analyticsService.getAnalytics(id);
      setData(analyticsData);
    } catch (err) {
      const message = err instanceof Error ? err.message : MESSAGES.ERROR.GENERIC;
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchAnalytics,
  };
}

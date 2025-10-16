// Custom hook for link management
import { useState, useEffect, useCallback } from 'react';
import { linkService } from '@/features/links/services/link.service';
import type { Link, CreateLinkRequest, UpdateLinkRequest } from '@/types/link.types';
import { toast } from 'sonner';
import { MESSAGES } from '@/config/constants';
import { useAuth } from './useAuth'; // Import useAuth

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth(); // Get isAuthenticated from useAuth

  const fetchLinks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await linkService.getLinks();
      setLinks(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : MESSAGES.ERROR.GENERIC;
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createLink = useCallback(async (data: CreateLinkRequest) => {
    setIsLoading(true);
    try {
      const newLink = await linkService.createLink(data);
      setLinks(prev => [newLink, ...prev]);
      toast.success(MESSAGES.SUCCESS.LINK_CREATED);
      return newLink;
    } catch (err) {
      const message = err instanceof Error ? err.message : MESSAGES.ERROR.GENERIC;
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLink = useCallback(async (id: string, data: UpdateLinkRequest) => {
    setIsLoading(true);
    try {
      const updatedLink = await linkService.updateLink(id, data);
      setLinks(prev => prev.map(link => link._id === id ? updatedLink : link));
      toast.success('Link updated successfully!');
      return updatedLink;
    } catch (err) {
      const message = err instanceof Error ? err.message : MESSAGES.ERROR.GENERIC;
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteLink = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await linkService.deleteLink(id);
      setLinks(prev => prev.filter(link => link._id !== id));
      toast.success(MESSAGES.SUCCESS.LINK_DELETED);
    } catch (err) {
      const message = err instanceof Error ? err.message : MESSAGES.ERROR.GENERIC;
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a refresh function for manual refresh
  const refreshLinks = useCallback(async () => {
    await fetchLinks();
  }, [fetchLinks]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLinks();
    }
  }, [fetchLinks, isAuthenticated]); // Add isAuthenticated to dependency array

  return {
    links,
    isLoading,
    error,
    fetchLinks,
    refreshLinks,
    createLink,
    updateLink,
    deleteLink,
  };
}

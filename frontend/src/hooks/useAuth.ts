// Custom hook for authentication via global context
import { useAuthContext } from '@/features/auth/context/AuthContext';

export function useAuth() {
  return useAuthContext();
}

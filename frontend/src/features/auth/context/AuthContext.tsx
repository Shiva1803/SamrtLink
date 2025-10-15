import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '@/features/auth/services/auth.service';
import { STORAGE_KEYS } from '@/config/constants';
import type { User, SignInCredentials, SignUpCredentials, AuthResponse } from '@/types/auth.types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<AuthResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage once
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (credentials: SignInCredentials) => {
    const res = await authService.signIn(credentials);
    // Persist and update context
    localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
    setUser(res.user);
    setToken(res.token);
    return res;
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    const res = await authService.signUp(credentials);
    localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.user));
    setUser(res.user);
    setToken(res.token);
    return res;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    signIn,
    signUp,
    logout,
  }), [user, token, isLoading, signIn, signUp, logout]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within an AuthProvider');
  return ctx;
};


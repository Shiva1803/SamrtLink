// TypeScript type definitions for the project

// Auth types
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}

// Link types
export interface Link {
  id: string;
  userId: string;
  originalUrl: string;
  shortUrl: string;
  customSlug?: string;
  qrCode?: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types
export interface Analytics {
  id: string;
  linkId: string;
  clicks: number;
  views: number;
  conversions: number;
  timestamp: Date;
  country?: string;
  device?: string;
  browser?: string;
  referrer?: string;
}

// Common types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

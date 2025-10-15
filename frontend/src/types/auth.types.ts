// Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface SignInCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}


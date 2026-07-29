/**
 * Authentication Types
 * Tipos TypeScript para autenticación y sesión
 */

import type { Session, User as NextAuthUser } from 'next-auth';

export enum UserRole {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  CLIENT = 'CLIENT',
}

export interface User extends NextAuthUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession extends Session {
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  acceptTerms: boolean;
}

export interface AuthError {
  code:
    | 'INVALID_CREDENTIALS'
    | 'USER_NOT_FOUND'
    | 'EMAIL_ALREADY_EXISTS'
    | 'INVALID_EMAIL'
    | 'WEAK_PASSWORD'
    | 'EMAIL_NOT_VERIFIED'
    | 'OAUTH_ERROR'
    | 'UNKNOWN_ERROR';
  message: string;
}

export interface AuthContextType {
  session: AuthSession | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const DEFAULT_LOGIN_REDIRECT = '/';
export const DEFAULT_LOGOUT_REDIRECT = '/';
export const DEFAULT_PROVIDER_REDIRECT = '/proveedor/dashboard';
export const DEFAULT_ADMIN_REDIRECT = '/admin';

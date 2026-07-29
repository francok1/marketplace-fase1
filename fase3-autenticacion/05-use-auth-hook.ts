/**
 * useAuth Hook
 * Hook para acceder a sesión, usuario y funciones de autenticación
 *
 * Uso:
 * const { session, user, isAuthenticated, logout } = useAuth();
 */

'use client';

import { useSession, signIn, signOut, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import type { Session } from 'next-auth';
import { UserRole } from './01-auth-types';

interface UseAuthReturn {
  session: Session | null;
  user: Session['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRole | null;
  isProvider: boolean;
  isAdmin: boolean;
  isClient: boolean;
  logout: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  const user = session?.user || null;
  const userRole = (user as any)?.role || null;

  const isProvider = userRole === UserRole.PROVIDER;
  const isAdmin = userRole === UserRole.ADMIN;
  const isClient = userRole === UserRole.CLIENT;

  // Logout
  const logout = useCallback(async () => {
    try {
      setIsSigningOut(true);
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsSigningOut(false);
    }
  }, [router]);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      await signIn('google', { redirect: false });
      router.refresh();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  }, [router]);

  // Sign in with Facebook
  const signInWithFacebook = useCallback(async () => {
    try {
      await signIn('facebook', { redirect: false });
      router.refresh();
    } catch (error) {
      console.error('Facebook sign in error:', error);
    }
  }, [router]);

  // Sign in with Apple
  const signInWithApple = useCallback(async () => {
    try {
      await signIn('apple', { redirect: false });
      router.refresh();
    } catch (error) {
      console.error('Apple sign in error:', error);
    }
  }, [router]);

  return {
    session,
    user,
    isAuthenticated,
    isLoading,
    userRole,
    isProvider,
    isAdmin,
    isClient,
    logout,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
  };
}

/**
 * Hook para proteger rutas
 * Redirige a login si no está autenticado
 *
 * Uso:
 * useProtectedRoute('/login');
 */
export function useProtectedRoute(redirectTo: string = '/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (!isLoading && !isAuthenticated) {
    router.push(redirectTo);
  }

  return { isLoading };
}

/**
 * Hook para proteger rutas por rol
 * Redirige si el rol no coincide
 *
 * Uso:
 * useProtectedRouteByRole(['PROVIDER', 'ADMIN']);
 */
export function useProtectedRouteByRole(
  allowedRoles: UserRole[],
  redirectTo: string = '/'
) {
  const { userRole, isLoading } = useAuth();
  const router = useRouter();

  if (!isLoading && userRole && !allowedRoles.includes(userRole)) {
    router.push(redirectTo);
  }

  return { isLoading, isAllowed: userRole && allowedRoles.includes(userRole) };
}

export type { UseAuthReturn };

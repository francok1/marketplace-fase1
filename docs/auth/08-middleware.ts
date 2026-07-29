/**
 * Next.js Middleware
 * Protege rutas y redirige según autenticación y rol
 *
 * Ubicación: src/middleware.ts (raíz de src/)
 * Aplica a todas las rutas definidas en matcher
 */

import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import type { JWT } from 'next-auth/jwt';
import { UserRole } from './01-auth-types';

// ============================================================================
// PROTECCIÓN DE RUTAS POR AUTENTICACIÓN
// ============================================================================

/**
 * Rutas que requieren estar NO autenticado
 * (Si está autenticado, redirige al dashboard)
 */
const publicOnlyRoutes = ['/login', '/register', '/forgot-password'];

/**
 * Rutas que requieren estar autenticado
 */
const protectedRoutes = ['/dashboard', '/cliente', '/proveedor'];

/**
 * Rutas que requieren rol ADMIN
 */
const adminRoutes = ['/admin'];

/**
 * Rutas que requieren rol PROVIDER
 */
const providerRoutes = ['/proveedor/dashboard'];

// ============================================================================
// MIDDLEWARE PRINCIPAL
// ============================================================================

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: JWT | null } }) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // ========================================================================
    // RUTAS PÚBLICAS (solo sin autenticación)
    // ========================================================================
    if (publicOnlyRoutes.some((route) => pathname.startsWith(route))) {
      // Si está autenticado, redirige según rol
      if (token) {
        const userRole = token.role as UserRole;

        if (userRole === UserRole.ADMIN) {
          return NextResponse.redirect(new URL('/admin', req.url));
        } else if (userRole === UserRole.PROVIDER) {
          return NextResponse.redirect(
            new URL('/proveedor/dashboard', req.url)
          );
        } else {
          return NextResponse.redirect(new URL('/cliente', req.url));
        }
      }
    }

    // ========================================================================
    // RUTAS PROTEGIDAS - Requieren autenticación
    // ========================================================================
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      if (!token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    // ========================================================================
    // RUTAS ADMIN - Requieren rol ADMIN
    // ========================================================================
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const userRole = token.role as UserRole;
      if (userRole !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // ========================================================================
    // RUTAS PROVEEDOR - Requieren rol PROVIDER
    // ========================================================================
    if (providerRoutes.some((route) => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const userRole = token.role as UserRole;
      if (userRole !== UserRole.PROVIDER) {
        return NextResponse.redirect(new URL('/cliente', req.url));
      }
    }

    // ========================================================================
    // OTRAS RUTAS - Redirigir dashboards
    // ========================================================================
    if (pathname === '/dashboard' && token) {
      const userRole = token.role as UserRole;

      if (userRole === UserRole.ADMIN) {
        return NextResponse.redirect(new URL('/admin', req.url));
      } else if (userRole === UserRole.PROVIDER) {
        return NextResponse.redirect(
          new URL('/proveedor/dashboard', req.url)
        );
      } else {
        return NextResponse.redirect(new URL('/cliente', req.url));
      }
    }

    // ========================================================================
    // PERMITIR PASO
    // ========================================================================
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Este callback se ejecuta antes del middleware principal
        // Aquí es donde decidimos si permitir acceso a la página
        // Retorna true si está autenticado, false si no
        return !!token;
      },
    },
  }
);

// ============================================================================
// MATCHER - Qué rutas aplica el middleware
// ============================================================================
export const config = {
  matcher: [
    // Proteger rutas de autenticación
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password/:path*',

    // Proteger rutas de usuario
    '/dashboard/:path*',
    '/cliente/:path*',
    '/proveedor/:path*',

    // Proteger rutas de admin
    '/admin/:path*',

    // Excluir archivos estáticos y API
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};

// ============================================================================
// MIDDLEWARE ALTERNATIVO (Sin usar withAuth)
// ============================================================================
/*
// Si necesitas más control sin usar withAuth:

import { auth } from '@/lib/auth/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Tu lógica aquí

  return NextResponse.next();
}
*/

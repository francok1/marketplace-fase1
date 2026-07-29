/**
 * NextAuth Route Handler
 * Endpoint: /api/auth/[...nextauth]
 * Maneja todos los endpoints de autenticación
 *
 * Ubicación: app/api/auth/[...nextauth]/route.ts
 */

import { handlers, auth, signIn, signOut } from 'next-auth';
import authConfig from '@/lib/auth/config';

// Re-exportar handlers GET y POST
export const { GET, POST } = handlers;

// También puedes exportar auth, signIn, signOut para usar en Server Components
export { auth, signIn, signOut };

/**
 * Endpoints disponibles automáticamente:
 *
 * POST /api/auth/signin
 *   - Iniciar sesión con email/password
 *   - OAuth: ?provider=google|facebook|apple
 *
 * POST /api/auth/callback/[provider]
 *   - Callback después de OAuth
 *
 * GET /api/auth/session
 *   - Obtener sesión actual
 *
 * POST /api/auth/signout
 *   - Cerrar sesión
 *
 * GET /api/auth/csrf
 *   - Token CSRF
 *
 * GET /api/auth/providers
 *   - Listar providers disponibles
 *
 * GET /api/auth/error?error=[code]
 *   - Mostrar página de error
 */

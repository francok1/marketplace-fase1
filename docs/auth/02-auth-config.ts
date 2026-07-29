/**
 * NextAuth Configuration
 * Configuración completa de NextAuth.js con múltiples providers
 *
 * Uso en app/api/auth/[...nextauth]/route.ts:
 * import { handlers } = from '@/lib/auth/config';
 * export const { GET, POST } = handlers;
 */

import type { NextAuthConfig, Session, User as NextAuthUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import Apple from 'next-auth/providers/apple';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db/client';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { UserRole } from './01-auth-types';

const adapter = PrismaAdapter(db);

export const authConfig: NextAuthConfig = {
  // ============================================================================
  // PROVIDERS - Métodos de autenticación
  // ============================================================================
  providers: [
    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),

    // Facebook OAuth
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),

    // Apple OAuth
    Apple({
      clientId: process.env.APPLE_CLIENT_ID || '',
      clientSecret: process.env.APPLE_CLIENT_SECRET || '',
    }),

    // Email/Password Credentials
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // Validar credenciales
        const result = loginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;

        // Buscar usuario
        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        // Verificar contraseña
        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // Retornar usuario
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar,
          emailVerified: user.emailVerified,
          role: user.role,
        };
      },
    }),
  ],

  // ============================================================================
  // ADAPTER - Persistencia en BD
  // ============================================================================
  adapter,

  // ============================================================================
  // CALLBACKS - Lógica personalizada
  // ============================================================================
  callbacks: {
    // JWT callback - Actualizar token
    async jwt({ token, user, account, isNewUser }) {
      // Agregar datos del usuario al token
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || UserRole.CLIENT;
        token.emailVerified = user.emailVerified;
      }

      // Manejar nuevo usuario desde OAuth
      if (isNewUser && account) {
        // Crear perfil si es proveedor
        const role = (user as any).role || UserRole.CLIENT;
        // Actualizar rol si es necesario
        await db.user.update({
          where: { id: user.id },
          data: { role },
        });
      }

      return token;
    },

    // Session callback - Agregar info al objeto session
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },

    // Redirect callback - Redirigir después de login/logout
    async redirect({ url, baseUrl }) {
      // URLs relativas es seguro redirigir
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // URLs del mismo dominio es seguro redirigir
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },

    // Signin callback - Permitir/denegar login
    async signIn({ user, account, isNewUser }) {
      // Denegar si no es verificado (opcional)
      if (!user.emailVerified && account?.provider === 'credentials') {
        // Para desarrollo puedes comentar esto
        // return '/auth/verify-email';
      }

      return true;
    },
  },

  // ============================================================================
  // PAGES - Páginas personalizadas
  // ============================================================================
  pages: {
    signIn: '/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },

  // ============================================================================
  // SESSION & EVENTS
  // ============================================================================
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
    updateAge: 24 * 60 * 60,   // Actualizar cada 24 horas
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },

  // ============================================================================
  // SEGURIDAD
  // ============================================================================
  trustHost: true,
  useSecureCookies: process.env.NODE_ENV === 'production',
  secret: process.env.NEXTAUTH_SECRET,

  // ============================================================================
  // EVENTOS (Logging)
  // ============================================================================
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log(`✅ Sign in: ${user.email} (${account?.provider})`);
    },

    async signOut({ token }) {
      console.log(`❌ Sign out: ${token.email}`);
    },

    async createUser({ user }) {
      console.log(`👤 New user created: ${user.email}`);
    },

    async updateUser({ user }) {
      console.log(`📝 User updated: ${user.email}`);
    },

    async linkAccount({ user, account }) {
      console.log(`🔗 Account linked: ${user.email} - ${account.provider}`);
    },

    async error({ code, message }) {
      console.error(`⚠️  Auth error [${code}]: ${message}`);
    },
  },
};

export default authConfig;

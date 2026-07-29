# FASE 6: Autenticación - Guía de Configuración

## ✅ Lo que se implementó

1. **Configuración de NextAuth.js** (`lib/auth.ts`)
   - Providers: Google, Facebook, Apple
   - Estrategia de sesión: Database (Prisma)
   - Callbacks configurados

2. **API de NextAuth** (`app/api/auth/[...nextauth]/route.ts`)
   - Ruta de autenticación lista

3. **Páginas de Autenticación**
   - Sign In: `/auth/signin`
   - Sign Up: `/auth/signup` (con selector de tipo de usuario)

4. **Dashboard** (`/dashboard`)
   - Página protegida con sesión
   - Menú de opciones principales

5. **Middleware** (`middleware.ts`)
   - Protección de rutas
   - Redirecciones automáticas

6. **Schema de Prisma** (actualizado)
   - Modelos NextAuth.js (Account, Session, VerificationToken)
   - Modelos de aplicación mejorados
   - Relaciones establecidas

## 🔧 Pasos Siguientes para Completar

### 1. Instalar Dependencias Necesarias

```bash
npm install @next-auth/prisma-adapter
```

### 2. Configurar Variables de Entorno

Edita `.env.local` (copia de `.env.example`):

```env
# NextAuth
NEXTAUTH_SECRET=genera-una-cadena-aleatoria-de-32-caracteres
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
# Ve a: https://console.cloud.google.com/
# Crea un proyecto, habilita Google+ API
# Crea credenciales OAuth 2.0 (tipo: Aplicación web)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret

# Facebook OAuth
# Ve a: https://developers.facebook.com/
# Crea una app y configura Facebook Login
FACEBOOK_CLIENT_ID=tu-facebook-client-id
FACEBOOK_CLIENT_SECRET=tu-facebook-client-secret

# Apple OAuth
# Ve a: https://developer.apple.com/
# Configura Sign in with Apple
APPLE_CLIENT_ID=tu-apple-client-id
APPLE_CLIENT_SECRET=tu-apple-client-secret

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/clubnovios"
```

### 3. Ejecutar Migración de Prisma

```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migración (creará tablas en BD)
npx prisma migrate dev --name init
```

### 4. Probar la Autenticación

1. Inicia el servidor: `npm run dev`
2. Ve a `http://localhost:3000/auth/signup`
3. Elige tipo de usuario (Pareja o Proveedor)
4. Haz click en Google/Facebook/Apple
5. Se te redirigirá a `/dashboard` después de autenticarte

## 📚 Recursos Útiles

- NextAuth.js Docs: https://next-auth.js.org/
- Prisma Adapter: https://authjs.dev/reference/adapter/prisma
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- Facebook Login: https://developers.facebook.com/docs/facebook-login/

## 🎯 Próxima Fase

**FASE 7: Búsqueda y Filtrado**
- Página de búsqueda avanzada
- Sistema de filtros
- API de búsqueda

---

**Status:** En Configuración ⏳
**Próximas Fases:** 7, 8, 9, 10, 11, 12, 13, 14

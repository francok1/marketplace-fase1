# 🔐 FASE 3: AUTENTICACIÓN CON NEXTAUTH.JS

## 📋 Contenido

Autenticación completa y profesional con:
- ✅ Email/Password
- ✅ OAuth (Google, Facebook, Apple)
- ✅ JWT Sessions
- ✅ Protección de rutas
- ✅ Gestión de roles
- ✅ Password hashing (bcryptjs)
- ✅ Validación (Zod)
- ✅ TypeScript 100%

---

## 📦 Archivos Incluidos

```
01-auth-types.ts              - Tipos TypeScript
02-auth-config.ts             - Configuración NextAuth.js
03-password-utils.ts          - Hashing y validación de contraseñas
04-auth-validations.ts        - Esquemas Zod para validación
05-use-auth-hook.ts           - Hook useAuth() para componentes
06-login-form.tsx             - Componente LoginForm
07-register-form.tsx          - Componente RegisterForm
08-middleware.ts              - Middleware de protección de rutas
09-register-api-route.ts      - API route POST /api/auth/register
10-nextauth-route.ts          - API route [...nextauth]
AUTENTICACION_README.md       - Este archivo
AUTENTICACION_SUMMARY.md      - Resumen ejecutivo
```

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install next-auth bcryptjs
# o
pnpm add next-auth bcryptjs
```

### 2. Copiar archivos

```bash
# Crear estructura
mkdir -p src/lib/auth
mkdir -p src/lib/validations
mkdir -p src/components/auth
mkdir -p app/api/auth

# Copiar archivos
cp 01-auth-types.ts src/lib/auth/
cp 02-auth-config.ts src/lib/auth/
cp 03-password-utils.ts src/lib/auth/
cp 04-auth-validations.ts src/lib/validations/
cp 05-use-auth-hook.ts src/lib/hooks/
cp 06-login-form.tsx src/components/auth/
cp 07-register-form.tsx src/components/auth/
cp 08-middleware.ts src/
cp 09-register-api-route.ts app/api/auth/register/
cp 10-nextauth-route.ts app/api/auth/[...nextauth]/
```

### 3. Configurar variables de entorno

```bash
# .env.local

# NextAuth
NEXTAUTH_SECRET=your-secret-here (genera con: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...
```

### 4. Usar en aplicación

```tsx
// Layout (app/layout.tsx)
import { SessionProvider } from 'next-auth/react';

export default function RootLayout() {
  return (
    <SessionProvider>
      {/* Tu contenido */}
    </SessionProvider>
  );
}
```

---

## 💻 Uso

### Hook useAuth()

```tsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';

export function MyComponent() {
  const {
    session,
    user,
    isAuthenticated,
    isLoading,
    userRole,
    isProvider,
    isAdmin,
    logout,
    signInWithGoogle,
  } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <h1>Hola, {user?.name}!</h1>
      <p>Role: {userRole}</p>
      {isProvider && <p>Eres proveedor</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Componente LoginForm

```tsx
import { LoginForm } from '@/components/auth/06-login-form';

export default function LoginPage() {
  return (
    <LoginForm
      onSuccess={() => console.log('Login exitoso')}
      callbackUrl="/dashboard"
    />
  );
}
```

### Componente RegisterForm

```tsx
import { RegisterForm } from '@/components/auth/07-register-form';
import { UserRole } from '@/lib/auth/auth-types';

export default function RegisterPage() {
  return (
    <RegisterForm
      onSuccess={() => console.log('Registro exitoso')}
      defaultRole={UserRole.CLIENT}
    />
  );
}
```

### Proteger rutas

```tsx
// En app/api/mi-api/route.ts
import { auth } from '@/lib/auth/config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Tu lógica aquí
  return NextResponse.json({ data: 'secreto' });
}
```

### Server Components

```tsx
import { auth } from '@/lib/auth/config';

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Bienvenido, {session.user?.name}</h1>
    </div>
  );
}
```

---

## 📚 API Reference

### useAuth()

```typescript
const {
  session: Session | null,           // Sesión actual
  user: User | null,                 // Usuario actual
  isAuthenticated: boolean,          // ¿Está autenticado?
  isLoading: boolean,                // ¿Cargando?
  userRole: UserRole | null,         // Rol del usuario
  isProvider: boolean,               // ¿Es proveedor?
  isAdmin: boolean,                  // ¿Es admin?
  isClient: boolean,                 // ¿Es cliente?
  logout: () => Promise<void>,       // Cerrar sesión
  signInWithGoogle: () => Promise<void>,    // OAuth Google
  signInWithFacebook: () => Promise<void>,  // OAuth Facebook
  signInWithApple: () => Promise<void>,     // OAuth Apple
} = useAuth();
```

### useProtectedRoute()

```typescript
// Proteger ruta (redirige a login si no autenticado)
useProtectedRoute('/login');
```

### useProtectedRouteByRole()

```typescript
// Proteger por rol
const { isLoading, isAllowed } = useProtectedRouteByRole(
  ['PROVIDER', 'ADMIN'],
  '/unauthorized'
);
```

### hashPassword() / verifyPassword()

```typescript
// Hash contraseña
const hashed = await hashPassword('miPassword123!');

// Verificar
const isValid = await verifyPassword('miPassword123!', hashed);
```

### validatePasswordStrength()

```typescript
const { isValid, errors } = validatePasswordStrength('password');
// errors: ['Mínimo 8 caracteres', 'Debe contener mayúscula', ...]
```

---

## 🔒 Seguridad

### Contraseñas

- Hasheadas con bcryptjs (12 salt rounds)
- Validación de fortaleza
- Mínimo 8 caracteres
- Requiere mayúscula, minúscula, número, carácter especial

### JWT

- Expire en 30 días
- Refrescadas cada 24 horas
- Almacenadas en HTTP-only cookies
- CSRF protection automática

### Middleware

- Protege rutas según autenticación
- Redirigir por rol
- Previene acceso no autorizado

### OAuth

- Usa provider oficial
- Callback seguro
- Email linking seguro

---

## 🛂 Rutas Protegidas

### Solo autenticados
```
/dashboard/*
/cliente/*
/proveedor/*
```

### Solo ADMIN
```
/admin/*
```

### Solo PROVIDER
```
/proveedor/dashboard/*
```

### Solo sin autenticar
```
/login
/register
/forgot-password
```

---

## 🔄 Flujo de Autenticación

### Login con Email/Password

```
Usuario ingresa credenciales
        ↓
Validación con Zod
        ↓
Buscar usuario en BD
        ↓
Verificar contraseña
        ↓
Crear JWT token
        ↓
Guardar sesión en BD
        ↓
Redirigir a dashboard
```

### OAuth (Google/Facebook/Apple)

```
Usuario hace click en "Sign in with Google"
        ↓
Redirige a Google
        ↓
Usuario autentica en Google
        ↓
Google redirige a callback
        ↓
Buscar/crear usuario en BD
        ↓
Crear JWT token
        ↓
Redirigir a dashboard
```

### Logout

```
Usuario hace click logout
        ↓
Eliminar JWT token
        ↓
Eliminar sesión de BD
        ↓
Redirigir a home
```

---

## 📊 Base de Datos

### Tabla User (Prisma)

```prisma
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  emailVerified   DateTime?
  password        String?
  name            String?
  avatar          String?
  role            UserRole  @default(CLIENT)
  isActive        Boolean   @default(true)
  lastLogin       DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // NextAuth relations
  accounts        Account[]
  sessions        Session[]
}

enum UserRole {
  ADMIN
  PROVIDER
  CLIENT
}
```

---

## 🧪 Testing

### Test Login

```bash
curl -X POST http://localhost:3000/api/auth/signin/credentials \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'
```

### Test Session

```bash
curl http://localhost:3000/api/auth/session
```

### Test Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!",
    "role": "CLIENT",
    "acceptTerms": true
  }'
```

---

## 🐛 Troubleshooting

**Error: "NEXTAUTH_SECRET not provided"**
```bash
# Genera el secret
openssl rand -base64 32
# Agrega a .env.local
NEXTAUTH_SECRET=...
```

**Error: "Invalid OAuth credentials"**
- Verifica que las credenciales de OAuth están correctas
- Asegúrate que el callback URL está permitido en el provider

**Error: "Cannot find module 'next-auth'"**
```bash
npm install next-auth
```

**Session no se actualiza**
```tsx
// Force refresh
router.refresh();
```

---

## 📋 Checklist

- [ ] Instalar dependencias
- [ ] Copiar archivos a proyecto
- [ ] Configurar .env.local
- [ ] Crear variables OAuth (Google, Facebook, Apple)
- [ ] Ejecutar migrations de BD
- [ ] Envolver app con SessionProvider
- [ ] Probar login/register
- [ ] Probar OAuth
- [ ] Probar middleware
- [ ] Probar logout

---

## 🚀 Próximos Pasos

1. **Verificación de Email** - Enviar emails de confirmación
2. **Reset Password** - Formulario de recuperar contraseña
3. **Two Factor Auth** - Autenticación de dos factores
4. **Social Linking** - Vincular múltiples OAuth
5. **Admin Dashboard** - Panel de administrador

---

## 📚 Documentación Adicional

- [NextAuth.js Docs](https://next-auth.js.org)
- [bcryptjs Docs](https://github.com/dcodeIO/bcrypt.js)
- [Zod Docs](https://zod.dev)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)

---

**Autenticación profesional, lista para producción.** ✅

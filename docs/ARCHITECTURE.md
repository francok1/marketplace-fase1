# 🏗️ ARQUITECTURA TÉCNICA

## 📐 Patrones y Principios

### 1. Server Components by Default
```tsx
// ✅ DEFAULT: Server Component (Renderiza en el servidor)
export default async function HomePage() {
  // Acceso directo a BD
  const providers = await db.provider.findMany();
  
  return (
    <div>
      <h1>Proveedores</h1>
      <ClientComponentChild data={providers} />
    </div>
  );
}

// ❌ SOLO cuando sea necesario: Client Component
'use client';

import { useState } from 'react';

export default function ClientComponent({ data }) {
  const [count, setCount] = useState(0);
  // Interactividad, hooks, eventos
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Ventajas:**
- Menor tamaño de JS enviado al cliente
- Seguridad (secrets no expuestos)
- Mejor SEO
- Queries directas a BD

---

### 2. Server Actions para Mutaciones
```tsx
// app/providers/actions.ts (Server)
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProvider(data: ProviderFormData) {
  try {
    // Validación
    const validated = providerSchema.parse(data);
    
    // Mutación directa en BD
    const provider = await db.provider.create({
      data: {
        ...validated,
        userId: await getCurrentUserId(),
      },
    });
    
    // Revalidar cache
    revalidatePath('/proveedor/[slug]', 'page');
    
    return { success: true, data: provider };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// En componente client
'use client';

import { createProvider } from './actions';

export function CreateProviderForm() {
  const [isPending, setIsPending] = useState(false);
  
  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await createProvider({
      name: formData.get('name'),
      email: formData.get('email'),
    });
    setIsPending(false);
    
    if (result.success) {
      toast.success('Proveedor creado');
      router.push(`/proveedor/${result.data.slug}`);
    }
  }
  
  return (
    <form action={handleSubmit}>
      <input name="name" required />
      <input name="email" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creando...' : 'Crear'}
      </button>
    </form>
  );
}
```

---

### 3. TanStack Query para Datos Asincronos
```tsx
// lib/hooks/useProviders.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';

export function useProviders(filters?: SearchFilters) {
  return useQuery({
    queryKey: ['providers', filters],
    queryFn: () => api.providers.search(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,     // 10 minutos
  });
}

export function useProvider(slug: string) {
  return useQuery({
    queryKey: ['provider', slug],
    queryFn: () => api.providers.getBySlug(slug),
    enabled: !!slug,
  });
}

// En componente
'use client';

import { useProviders } from '@/lib/hooks/useProviders';
import { ProviderCard } from '@/components/marketplace/provider-card';

export function ProviderGrid() {
  const { data, isLoading, error } = useProviders();
  
  if (isLoading) return <SkeletonGrid />;
  if (error) return <ErrorState />;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map(provider => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
```

---

### 4. Zod para Validación
```tsx
// lib/validations/provider.ts
import { z } from 'zod';

export const providerSchema = z.object({
  businessName: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  
  email: z.string().email('Email inválido'),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Teléfono inválido'),
  
  businessDescription: z
    .string()
    .max(1000, 'Máximo 1000 caracteres')
    .optional(),
  
  cityId: z.string().cuid('ID de ciudad inválido'),
  
  categories: z
    .array(z.string().cuid())
    .min(1, 'Selecciona al menos una categoría')
    .max(5, 'Máximo 5 categorías'),
  
  website: z.string().url().optional().or(z.literal('')),
});

export type ProviderFormData = z.infer<typeof providerSchema>;

// En formulario
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function ProviderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('businessName')} />
      {errors.businessName && (
        <span className="text-error">{errors.businessName.message}</span>
      )}
    </form>
  );
}
```

---

## 📂 Estructura de Carpetas - Detalles

### app/ (App Router)
```
app/
├── layout.tsx                 # Layout raíz (HTML base)
├── page.tsx                   # Home (/
├── error.tsx                  # Error boundary
├── not-found.tsx              # 404 handler
│
├── (auth)/                    # Layout grupo (sin cambiar ruta)
│   ├── layout.tsx             # Layout para auth
│   ├── login/page.tsx         # /login
│   ├── register/page.tsx       # /register
│   └── forgot-password/page.tsx# /forgot-password
│
├── (marketplace)/             # Layout grupo marketplace
│   ├── layout.tsx
│   ├── page.tsx               # / (redirigido desde root)
│   ├── buscar/page.tsx        # /buscar
│   ├── categorias/
│   │   ├── page.tsx           # /categorias
│   │   └── [slug]/page.tsx    # /categorias/fotografos
│   ├── proveedor/
│   │   └── [slug]/
│   │       ├── page.tsx       # /proveedor/nombre-negocio
│   │       ├── layout.tsx
│   │       └── error.tsx
│   ├── como-funciona/page.tsx # /como-funciona
│   └── soporte/page.tsx       # /soporte
│
├── (dashboard)/               # Protected routes (middleware)
│   ├── cliente/
│   │   ├── layout.tsx         # Dashboard layout
│   │   ├── page.tsx           # /cliente (inicio)
│   │   ├── favoritos/page.tsx # /cliente/favoritos
│   │   ├── opiniones/page.tsx # /cliente/opiniones
│   │   ├── cotizaciones/page.tsx
│   │   └── configuracion/page.tsx
│   │
│   ├── proveedor/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # /proveedor (inicio)
│   │   ├── perfil/
│   │   │   ├── page.tsx       # Editar perfil
│   │   │   └── actions.ts     # Server actions
│   │   ├── galeria/page.tsx
│   │   ├── servicios/page.tsx
│   │   ├── opiniones/page.tsx
│   │   ├── mensajes/page.tsx
│   │   ├── cotizaciones/page.tsx
│   │   ├── estadisticas/page.tsx
│   │   ├── facturacion/page.tsx
│   │   ├── planes/page.tsx
│   │   └── configuracion/page.tsx
│   │
│   └── middleware.ts          # Protege /dashboard/* routes
│
├── admin/                     # Admin routes (protegidas)
│   ├── layout.tsx
│   ├── page.tsx               # /admin (dashboard)
│   ├── usuarios/
│   │   ├── page.tsx           # /admin/usuarios
│   │   └── [id]/page.tsx      # /admin/usuarios/123
│   ├── proveedores/page.tsx
│   ├── categorias/page.tsx
│   ├── opiniones/page.tsx
│   ├── reportes/page.tsx
│   ├── facturacion/page.tsx
│   ├── publicidad/page.tsx
│   ├── contenido/page.tsx
│   └── analytics/page.tsx
│
├── api/                       # Route handlers
│   ├── auth/
│   │   ├── [...nextauth]/
│   │   │   └── route.ts       # NextAuth endpoint
│   │   └── callback/route.ts
│   │
│   ├── providers/
│   │   ├── search/route.ts    # GET /api/providers/search?q=...
│   │   ├── trending/route.ts  # GET /api/providers/trending
│   │   ├── [id]/
│   │   │   ├── route.ts       # GET/PUT /api/providers/[id]
│   │   │   └── reviews/route.ts
│   │   └── [...slug]/route.ts
│   │
│   ├── reviews/
│   │   ├── route.ts           # POST /api/reviews
│   │   └── [id]/route.ts      # GET/PUT/DELETE
│   │
│   ├── quotes/
│   │   ├── route.ts           # POST
│   │   └── [id]/route.ts
│   │
│   ├── messages/
│   │   ├── route.ts           # POST
│   │   └── [id]/route.ts
│   │
│   ├── categories/route.ts
│   ├── cities/route.ts
│   ├── favorites/route.ts
│   │
│   ├── upload/route.ts        # Uploadthing endpoint
│   ├── webhooks/
│   │   ├── stripe/route.ts    # Stripe webhooks
│   │   └── uploadthing/route.ts
│   │
│   └── health/route.ts        # Healthcheck
│
└── globals.css                # Estilos globales
```

---

### components/
```
components/
├── ui/                        # shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── tabs.tsx
│   ├── select.tsx
│   ├── checkbox.tsx
│   ├── badge.tsx
│   ├── rating.tsx
│   ├── skeleton.tsx
│   ├── pagination.tsx
│   └── ...
│
├── common/                    # Componentes compartidos
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── breadcrumb.tsx
│   ├── hero-section.tsx
│   ├── search-bar.tsx
│   ├── filters-sidebar.tsx
│   └── loading-skeleton.tsx
│
├── marketplace/               # Componentes de dominio
│   ├── provider-card.tsx
│   ├── provider-header.tsx
│   ├── provider-gallery.tsx
│   ├── provider-info.tsx
│   ├── provider-services.tsx
│   ├── provider-faq.tsx
│   ├── review-card.tsx
│   ├── review-form.tsx
│   ├── review-distribution.tsx
│   ├── quote-form.tsx
│   ├── quote-card.tsx
│   ├── message-thread.tsx
│   ├── favorite-button.tsx
│   ├── share-button.tsx
│   ├── category-grid.tsx
│   ├── provider-grid.tsx
│   └── infinite-scroll.tsx
│
├── dashboard/                 # Componentes dashboard
│   ├── sidebar-nav.tsx
│   ├── stats-card.tsx
│   ├── chart-widget.tsx
│   ├── data-table.tsx
│   ├── analytics-charts.tsx
│   └── notification-badge.tsx
│
├── forms/                     # Formularios complejos
│   ├── provider-form.tsx
│   ├── service-form.tsx
│   ├── review-form.tsx
│   ├── category-select.tsx
│   ├── location-selector.tsx
│   └── image-uploader.tsx
│
├── admin/                     # Componentes admin
│   ├── user-table.tsx
│   ├── provider-table.tsx
│   ├── category-manager.tsx
│   ├── report-viewer.tsx
│   └── analytics-dashboard.tsx
│
└── layouts/
    ├── dashboard-layout.tsx
    ├── auth-layout.tsx
    └── marketplace-layout.tsx
```

---

### lib/
```
lib/
├── api/                       # API utilities
│   ├── client.ts              # Axios instance
│   ├── endpoints.ts           # URLs constantes
│   └── queries.ts             # Query functions
│
├── auth/
│   ├── auth.ts                # NextAuth configuration
│   ├── session.ts             # Session helpers
│   └── permissions.ts         # Role checks
│
├── db/
│   ├── client.ts              # Prisma client singleton
│   └── queries.ts             # Common database queries
│
├── hooks/                     # Custom React hooks
│   ├── useAuth.ts
│   ├── useProviders.ts
│   ├── useReviews.ts
│   ├── useQuotes.ts
│   ├── useFavorites.ts
│   ├── useMessages.ts
│   ├── useDebounce.ts
│   ├── useInfiniteScroll.ts
│   ├── useTheme.ts
│   ├── useMediaQuery.ts
│   └── useLocalStorage.ts
│
├── utils/
│   ├── cn.ts                  # classnames utility (Tailwind)
│   ├── date.ts                # Date formatting
│   ├── string.ts              # String utilities
│   ├── image.ts               # Image optimization
│   ├── slugify.ts             # URL slug creation
│   ├── rating.ts              # Rating calculations
│   ├── validation.ts          # Validation helpers
│   └── seo.ts                 # SEO utilities
│
├── constants/
│   ├── routes.ts              # Route paths
│   ├── categories.ts          # Category data
│   ├── cities.ts              # City data
│   ├── enums.ts               # TypeScript enums
│   └── config.ts              # App configuration
│
├── validations/               # Zod schemas
│   ├── auth.ts
│   ├── provider.ts
│   ├── review.ts
│   ├── quote.ts
│   ├── message.ts
│   └── admin.ts
│
├── services/                  # Business logic
│   ├── provider.service.ts
│   ├── review.service.ts
│   ├── quote.service.ts
│   ├── message.service.ts
│   ├── favorite.service.ts
│   ├── search.service.ts
│   ├── analytics.service.ts
│   └── email.service.ts
│
└── types/
    ├── index.ts               # Re-exports
    ├── auth.ts
    ├── provider.ts
    ├── review.ts
    ├── quote.ts
    ├── message.ts
    ├── favorite.ts
    └── common.ts
```

---

## 🔄 Flujos de Datos

### 1. Búsqueda de Proveedores (Marketplace)
```
User Input
    ↓
[SearchBar Component]
    ↓
debounce
    ↓
useProviders Hook (TanStack Query)
    ↓
GET /api/providers/search?q=...
    ↓
[API Route Handler]
    ↓
search.service.ts (Business Logic)
    ↓
Prisma (Database Query)
    ↓
SQL Query ↔ PostgreSQL
    ↓
Results Cache (5 min)
    ↓
[ProviderGrid Component] (Render)
```

### 2. Crear Reseña (Review)
```
User Click [Enviar Opinión]
    ↓
[ReviewForm Component]
    ↓
react-hook-form + Zod validation
    ↓
Server Action: createReview()
    ↓
getCurrentUserId() ← Session
    ↓
DB Mutation (Prisma)
    ↓
Trigger: Update Provider.averageRating
    ↓
revalidatePath('/proveedor/[slug]')
    ↓
Toast notification
    ↓
UI Updates (optimistic)
    ↓
Redirect to /proveedor/slug
```

### 3. Chat en Tiempo Real (Mensajería)
```
Provider/Client Opens Chat
    ↓
[MessageThread Component]
    ↓
Fetch Initial Messages
    ↓
GET /api/messages?providerId=X&userId=Y
    ↓
useQuery + refetchInterval: 3s
    ↓
New Message Arrives
    ↓
POST /api/messages
    ↓
Server Action (optimistic update)
    ↓
Notification to other user
    ↓
TanStack Query invalidates
    ↓
New message appears
```

---

## 🔐 Seguridad

### Authentication Flow
```
1. User registra con Email/Google/Apple
2. NextAuth.js crea Session
3. JWT + Database Session Token
4. Middleware protege rutas (/dashboard/*, /admin/*)
5. Server Components acceden getUserSession()
6. Logout invalida sesión
```

### Autorización
```
// middleware.ts
import { auth } from '@/lib/auth/auth';

export async function middleware(request) {
  const session = await auth();
  
  if (!session) {
    return redirect('/login');
  }
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (session.user.role !== 'ADMIN') {
      return redirect('/');
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

### Validación
```
1. Zod schemas en client (UX inmediata)
2. Re-validación en server actions
3. Type safety con TypeScript
4. Database constraints (unique, not null, etc)
```

---

## 📊 Caché Strategy

```
Recurso               | Estrategia
────────────────────────────────────
Proveedores (listado) | 5 min (SWR)
Proveedor (detail)    | 10 min (SWR)
Opiniones             | 5 min (SWR)
Categorías            | 1 hora (static)
Ciudades              | 1 hora (static)
Usuario (session)     | 0 (real-time)
Mensajes              | 3s polling (real-time)
────────────────────────────────────
```

---

## 📈 Performance Optimization

1. **Code Splitting**: Lazy load rutas con App Router
2. **Image Optimization**: Next.js Image component
3. **Font Optimization**: next/font
4. **Bundle Analysis**: `npm run analyze`
5. **Lighthouse**: Mira Core Web Vitals

```tsx
// ✅ Lazy load componentes pesados
import dynamic from 'next/dynamic';

const Analytics = dynamic(
  () => import('@/components/dashboard/analytics'),
  { loading: () => <Skeleton /> }
);
```

---

## 🚀 Deployment Ready

- **Environment Isolation**: dev, staging, production
- **Secrets Management**: Vercel/ENV vars
- **Database Migrations**: Prisma migrations
- **Error Tracking**: Sentry setup
- **Analytics**: Vercel Analytics
- **Monitoring**: health checks


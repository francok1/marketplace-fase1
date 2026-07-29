# MARKETPLACE DE SERVICIOS - ESTRUCTURA DEL PROYECTO

## 📁 Estructura de Carpetas

```
marketplace/
├── .github/
│   └── workflows/              # GitHub Actions
│       ├── deploy.yml
│       └── tests.yml
├── apps/
│   └── web/                    # Next.js Frontend
│       ├── src/
│       │   ├── app/            # App Router
│       │   │   ├── (auth)/
│       │   │   │   ├── login/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── register/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── forgot-password/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── layout.tsx
│       │   │   ├── (marketplace)/
│       │   │   │   ├── page.tsx                    # Home
│       │   │   │   ├── buscar/
│       │   │   │   │   └── page.tsx                # Search results
│       │   │   │   ├── proveedor/
│       │   │   │   │   └── [slug]/
│       │   │   │   │       └── page.tsx            # Provider profile
│       │   │   │   ├── categorias/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   └── [slug]/
│       │   │   │   │       └── page.tsx
│       │   │   │   ├── como-funciona/
│       │   │   │   │   └── page.tsx
│       │   │   │   ├── soporte/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── layout.tsx
│       │   │   ├── (dashboard)/
│       │   │   │   ├── cliente/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── favoritos/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── opiniones/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── cotizaciones/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   ├── configuracion/
│       │   │   │   │   │   └── page.tsx
│       │   │   │   │   └── layout.tsx
│       │   │   │   ├── proveedor/
│       │   │   │   │   ├── page.tsx
│       │   │   │   │   ├── perfil/
│       │   │   │   │   ├── galeria/
│       │   │   │   │   ├── servicios/
│       │   │   │   │   ├── opiniones/
│       │   │   │   │   ├── mensajes/
│       │   │   │   │   ├── cotizaciones/
│       │   │   │   │   ├── estadisticas/
│       │   │   │   │   ├── facturacion/
│       │   │   │   │   ├── planes/
│       │   │   │   │   ├── configuracion/
│       │   │   │   │   └── layout.tsx
│       │   │   │   └── middleware (en root)
│       │   │   ├── admin/
│       │   │   │   ├── page.tsx
│       │   │   │   ├── usuarios/
│       │   │   │   ├── proveedores/
│       │   │   │   ├── categorias/
│       │   │   │   ├── opiniones/
│       │   │   │   ├── reportes/
│       │   │   │   ├── facturacion/
│       │   │   │   ├── publicidad/
│       │   │   │   ├── contenido/
│       │   │   │   └── layout.tsx
│       │   │   ├── api/
│       │   │   │   ├── auth/
│       │   │   │   │   ├── [...nextauth]/
│       │   │   │   │   │   └── route.ts
│       │   │   │   │   └── callback/
│       │   │   │   ├── providers/
│       │   │   │   │   ├── search/
│       │   │   │   │   ├── [id]/
│       │   │   │   │   ├── trending/
│       │   │   │   │   └── [id]/reviews
│       │   │   │   ├── reviews/
│       │   │   │   ├── quotes/
│       │   │   │   ├── favorites/
│       │   │   │   ├── messages/
│       │   │   │   ├── categories/
│       │   │   │   ├── cities/
│       │   │   │   ├── upload/
│       │   │   │   ├── analytics/
│       │   │   │   └── webhooks/
│       │   │   │       ├── stripe/
│       │   │   │       └── uploadthing/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   ├── not-found.tsx
│       │   │   ├── error.tsx
│       │   │   └── loading.tsx
│       │   ├── components/
│       │   │   ├── ui/                # Shadcn/ui components
│       │   │   │   ├── button.tsx
│       │   │   │   ├── input.tsx
│       │   │   │   ├── card.tsx
│       │   │   │   ├── dialog.tsx
│       │   │   │   ├── popover.tsx
│       │   │   │   ├── dropdown-menu.tsx
│       │   │   │   ├── tabs.tsx
│       │   │   │   ├── select.tsx
│       │   │   │   ├── checkbox.tsx
│       │   │   │   ├── badge.tsx
│       │   │   │   ├── rating.tsx
│       │   │   │   ├── skeleton.tsx
│       │   │   │   ├── toast.tsx
│       │   │   │   ├── progress.tsx
│       │   │   │   ├── chart.tsx
│       │   │   │   └── pagination.tsx
│       │   │   ├── common/
│       │   │   │   ├── navbar.tsx
│       │   │   │   ├── footer.tsx
│       │   │   │   ├── breadcrumb.tsx
│       │   │   │   ├── hero-section.tsx
│       │   │   │   ├── search-bar.tsx
│       │   │   │   ├── filters-sidebar.tsx
│       │   │   │   └── loading-skeleton.tsx
│       │   │   ├── marketplace/
│       │   │   │   ├── provider-card.tsx
│       │   │   │   ├── provider-gallery.tsx
│       │   │   │   ├── review-card.tsx
│       │   │   │   ├── review-form.tsx
│       │   │   │   ├── review-distribution.tsx
│       │   │   │   ├── quote-form.tsx
│       │   │   │   ├── quote-card.tsx
│       │   │   │   ├── message-thread.tsx
│       │   │   │   ├── favorite-button.tsx
│       │   │   │   ├── share-button.tsx
│       │   │   │   ├── category-grid.tsx
│       │   │   │   ├── provider-header.tsx
│       │   │   │   ├── provider-info.tsx
│       │   │   │   ├── provider-services.tsx
│       │   │   │   └── provider-faq.tsx
│       │   │   ├── dashboard/
│       │   │   │   ├── sidebar-nav.tsx
│       │   │   │   ├── stats-card.tsx
│       │   │   │   ├── chart-widget.tsx
│       │   │   │   ├── table-base.tsx
│       │   │   │   ├── data-table.tsx
│       │   │   │   └── analytics-charts.tsx
│       │   │   ├── forms/
│       │   │   │   ├── provider-form.tsx
│       │   │   │   ├── service-form.tsx
│       │   │   │   ├── category-select.tsx
│       │   │   │   ├── location-selector.tsx
│       │   │   │   └── image-uploader.tsx
│       │   │   ├── provider/
│       │   │   │   └── components aquí
│       │   │   ├── admin/
│       │   │   │   └── components aquí
│       │   │   └── layouts/
│       │   │       ├── dashboard-layout.tsx
│       │   │       ├── auth-layout.tsx
│       │   │       └── marketplace-layout.tsx
│       │   ├── lib/
│       │   │   ├── api/
│       │   │   │   ├── client.ts              # API client setup
│       │   │   │   ├── endpoints.ts           # API endpoints constants
│       │   │   │   └── queries.ts             # TanStack Query helpers
│       │   │   ├── auth/
│       │   │   │   ├── auth.ts                # NextAuth config
│       │   │   │   ├── session.ts             # Session utilities
│       │   │   │   └── permissions.ts         # Permission checks
│       │   │   ├── db/
│       │   │   │   ├── client.ts              # Prisma client
│       │   │   │   └── queries.ts             # Database queries
│       │   │   ├── hooks/
│       │   │   │   ├── useAuth.ts
│       │   │   │   ├── useProviders.ts
│       │   │   │   ├── useReviews.ts
│       │   │   │   ├── useQuotes.ts
│       │   │   │   ├── useFavorites.ts
│       │   │   │   ├── useMessages.ts
│       │   │   │   ├── useDebounce.ts
│       │   │   │   └── useInfiniteScroll.ts
│       │   │   ├── utils/
│       │   │   │   ├── cn.ts                  # Class name utility
│       │   │   │   ├── date.ts                # Date formatting
│       │   │   │   ├── string.ts              # String utilities
│       │   │   │   ├── image.ts               # Image optimization
│       │   │   │   ├── slugify.ts             # URL slugification
│       │   │   │   ├── rating.ts              # Rating calculations
│       │   │   │   ├── validation.ts          # Validation utilities
│       │   │   │   └── seo.ts                 # SEO utilities
│       │   │   ├── constants/
│       │   │   │   ├── routes.ts              # Route constants
│       │   │   │   ├── categories.ts          # Category data
│       │   │   │   ├── cities.ts              # City data
│       │   │   │   ├── enums.ts               # TypeScript enums
│       │   │   │   └── config.ts              # App configuration
│       │   │   ├── validations/
│       │   │   │   ├── auth.ts                # Auth schemas
│       │   │   │   ├── provider.ts            # Provider schemas
│       │   │   │   ├── review.ts              # Review schemas
│       │   │   │   ├── quote.ts               # Quote schemas
│       │   │   │   ├── message.ts             # Message schemas
│       │   │   │   └── admin.ts               # Admin schemas
│       │   │   ├── services/
│       │   │   │   ├── provider.service.ts
│       │   │   │   ├── review.service.ts
│       │   │   │   ├── quote.service.ts
│       │   │   │   ├── message.service.ts
│       │   │   │   ├── favorite.service.ts
│       │   │   │   ├── search.service.ts
│       │   │   │   ├── analytics.service.ts
│       │   │   │   └── email.service.ts
│       │   │   └── types/
│       │   │       ├── index.ts
│       │   │       ├── auth.ts
│       │   │       ├── provider.ts
│       │   │       ├── review.ts
│       │   │       ├── quote.ts
│       │   │       ├── message.ts
│       │   │       ├── favorite.ts
│       │   │       └── common.ts
│       │   ├── hooks/
│       │   │   ├── client/
│       │   │   │   ├── useTheme.ts
│       │   │   │   ├── useMediaQuery.ts
│       │   │   │   └── useLocalStorage.ts
│       │   │   └── server/
│       │   │       ├── getProviders.ts
│       │   │       └── getUser.ts
│       │   ├── styles/
│       │   │   ├── globals.css                # Global styles
│       │   │   ├── animations.css             # Animations
│       │   │   └── themes.css                 # Theme variables
│       │   ├── middleware.ts                  # Route protection
│       │   ├── instrumentation.ts             # Observability
│       │   ├── env.ts                         # Type-safe env vars
│       │   └── config.ts
│       ├── public/
│       │   ├── images/
│       │   │   ├── heroes/
│       │   │   ├── icons/
│       │   │   ├── logos/
│       │   │   └── og-images/
│       │   ├── fonts/
│       │   └── videos/
│       ├── .env.local
│       ├── .env.example
│       ├── .eslintrc.json
│       ├── next.config.js
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       ├── package.json
│       ├── package-lock.json
│       └── README.md
├── packages/
│   ├── db/
│   │   ├── prisma/
│   │   │   ├── schema.prisma          # Main database schema
│   │   │   └── migrations/
│   │   ├── seed.ts                    # Database seeding
│   │   └── package.json
│   ├── config/
│   │   ├── tailwind.config.ts
│   │   ├── eslint-config/
│   │   └── tsconfig/
│   └── types/
│       ├── index.ts
│       └── package.json
├── .gitignore
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## 📋 Stack Tecnológico

### Frontend
- **Next.js 15** - Full-stack React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Queries & State
- **TanStack Query** - Server state management
- **Zustand** - Client state (optional, minimal)

### Backend
- **Next.js API Routes** - Serverless backend
- **Prisma ORM** - Database access
- **PostgreSQL** - Database

### Auth & Security
- **NextAuth/Auth.js** - Authentication
- **JWT** - Token management
- **bcryptjs** - Password hashing

### Media
- **Uploadthing** - File uploads
- **Sharp** - Image optimization

### Payments
- **Stripe** - Payment processing
- **Stripe Webhooks** - Event handling

### Email
- **Resend** or **SendGrid** - Email sending

### Analytics & SEO
- **Vercel Analytics** - Performance monitoring
- **next-sitemap** - Sitemap generation

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **Husky** - Git hooks
- **Commitizen** - Conventional commits

## 🚀 Workflow

1. Monorepo con pnpm workspaces
2. Shared packages para DB y config
3. Single Next.js app con App Router
4. API routes co-localizadas
5. Middleware para protección de rutas
6. Server Components por defecto
7. TanStack Query para datos asíncronos

# 💍 Clubnovios - Marketplace Premium de Bodas

## 🎯 Descripción General

**Clubnovios** es una plataforma premium de marketplace que conecta parejas con proveedores especializados en servicios matrimoniales. Inspirada en Matrimonio.cl, ofrece una experiencia elegante y sofisticada para planificar el evento más importante de tu vida.

---

## 📋 Estructura del Proyecto

### Stack Tecnológico
- **Frontend:** Next.js 14.2.0, React 18.2.0, TypeScript
- **Styling:** Tailwind CSS, Shadcn/ui
- **Backend:** Next.js API Routes
- **Base de Datos:** PostgreSQL + Prisma ORM
- **Autenticación:** NextAuth.js 4.24.0 (Google, Facebook, Apple OAuth)
- **Validación:** React Hook Form + Zod
- **Estado:** TanStack Query
- **Pagos:** Stripe (pendiente de implementación)
- **Mensajería:** Socket.io (pendiente)
- **Hosting:** Vercel (recomendado)

---

## 📁 Estructura de Carpetas

```
clubnovios/
├── app/
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Estilos globales
│   ├── auth/
│   │   ├── signin/page.tsx     # Login
│   │   └── signup/page.tsx     # Registro
│   ├── search/page.tsx         # Búsqueda y filtrado
│   ├── provider/
│   │   └── [id]/page.tsx       # Perfil de proveedor
│   ├── dashboard/page.tsx      # Dashboard del usuario
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts
│   └── providers.tsx           # SessionProvider
├── components/
│   ├── common/
│   │   └── navbar.tsx
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   ├── auth.ts                 # Configuración NextAuth
│   ├── prisma.ts               # Cliente Prisma
│   └── utils.ts
├── prisma/
│   ├── schema.prisma           # Modelos de BD
│   └── migrations/             # Migraciones
├── middleware.ts               # Protección de rutas
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .env.example
```

---

## 🚀 Fases de Desarrollo

### ✅ FASES COMPLETADAS

#### FASE 1-5: Diseño y Base
- Homepage con diseño premium matrimonial
- Navbar elegante con branding
- Secciones: Hero, Categorías, Proveedores, Estadísticas, CTA
- Tailwind CSS correctamente compilado
- Espacios aireados y diseño sofisticado
- Colores dorados y tonos elegantes

#### FASE 6: Autenticación
- [x] Configuración NextAuth.js
- [x] OAuth: Google, Facebook, Apple
- [x] Página de Login (`/auth/signin`)
- [x] Página de Registro con selector de tipo (`/auth/signup`)
- [x] Dashboard protegido (`/dashboard`)
- [x] Middleware de autenticación
- [x] Schema Prisma actualizado
- **Estado:** Necesita ejecutar: `npx prisma migrate dev`

#### FASE 7: Búsqueda y Filtrado
- [x] Página de búsqueda avanzada (`/search`)
- [x] Filtros: Categoría, Ubicación, Presupuesto, Rating
- [x] Resultados con tarjetas de proveedores
- [x] Opción de favoritos
- **Status:** Listo para usar

#### FASE 8: Perfiles de Proveedores
- [x] Página de perfil (`/provider/[id]`)
- [x] Tabs: Acerca de, Portafolio, Servicios, Reseñas
- [x] Información de contacto
- [x] Galería de trabajos
- [x] Listado de servicios con precios
- [x] Sistema de reseñas
- **Status:** Listo para usar

---

### ⏳ FASES PENDIENTES

#### FASE 9: Sistema de Cotizaciones (Próxima)
- API de cotizaciones
- Formulario de solicitud
- Dashboard de cotizaciones
- Notificaciones automáticas
- Estados: Pending, Accepted, Rejected, Expired

#### FASE 10: Mensajería en Tiempo Real
- Socket.io para chat
- Historial de conversaciones
- Notificaciones en tiempo real
- Typing indicator

#### FASE 11: Reseñas y Ratings
- Formulario para crear reseñas
- Rating automático de proveedores
- Verificación de compra

#### FASE 12: Pagos con Stripe
- Procesamiento de tarjetas
- Checkout seguro
- Historial de transacciones
- Webhooks de Stripe

#### FASE 13: Panel de Admin
- Dashboard de administración
- Gestión de usuarios
- Verificación de proveedores
- Reportes y estadísticas

#### FASE 14: Deployment
- CI/CD con GitHub Actions
- Deploy en Vercel
- Configuración de producción
- Monitoreo y logs

---

## 🛠️ Instalación y Setup

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd clubnovios
```

### 2. Instalar Dependencias
```bash
npm install
# o
pnpm install
```

### 3. Configurar Variables de Entorno
Copia `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
```env
# Base de Datos
DATABASE_URL="postgresql://user:password@localhost:5432/clubnovios"

# NextAuth
NEXTAUTH_SECRET=tu-secreto-aleatorio-32-chars
NEXTAUTH_URL=http://localhost:3000

# OAuth (Obtén estas credenciales de los consoles respectivos)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
APPLE_CLIENT_ID=...
APPLE_CLIENT_SECRET=...
```

### 4. Preparar Base de Datos
```bash
# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# (Opcional) Ver base de datos visualmente
npx prisma studio
```

### 5. Compilar Tailwind CSS
```bash
npm run tailwind:build
```

### 6. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

El servidor estará disponible en: http://localhost:3000

---

## 📖 Rutas Disponibles

### Públicas
- `/` - Homepage
- `/search` - Búsqueda de proveedores
- `/provider/[id]` - Perfil de proveedor
- `/auth/signin` - Login
- `/auth/signup` - Registro

### Protegidas (Requieren autenticación)
- `/dashboard` - Panel del usuario
- `/quotes` - Mis cotizaciones
- `/chat` - Mensajería
- `/favorites` - Mis favoritos

### Admin (Requieren rol admin)
- `/admin` - Panel de administración
- `/admin/users` - Gestión de usuarios
- `/admin/providers` - Gestión de proveedores

---

## 💾 Base de Datos

### Modelos Principales

**User**
- Autenticación con NextAuth
- Rol: ADMIN, PROVIDER, CLIENT
- Tipo: COUPLE o PROVIDER

**Provider**
- Perfil completo de proveedor
- Categoría, ubicación, precio
- Rating y reviews

**Quote**
- Solicitud de cotización
- Estados: PENDING, ACCEPTED, REJECTED, EXPIRED
- Relaciones con User y Provider

**Message**
- Mensajes entre usuarios
- Timestamp y estado de lectura

**Review**
- Reseñas de clientes
- Rating 1-5 estrellas
- Verificación de compra

---

## 🔐 Seguridad

### Implementado
- ✅ NextAuth.js para autenticación
- ✅ Middleware para protección de rutas
- ✅ Validación con Zod
- ✅ CORS configurado
- ✅ Variables de entorno sensibles

### Recomendaciones
- [ ] Rate limiting en APIs
- [ ] Sanitización de inputs
- [ ] HTTPS en producción
- [ ] CSP headers
- [ ] CSRF protection

---

## 📱 Responsive Design

El sitio es completamente responsive:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

Utiliza Tailwind CSS media queries:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## 🎨 Diseño Visual

### Paleta de Colores
- **Primario:** Dorado (#F59E0B)
- **Secundario:** Negro (#111827)
- **Acentos:** Blanco y grises
- **Bordes:** Gris claro (#E5E7EB)

### Tipografía
- **Font:** Inter (Google Fonts)
- **Tamaños:** Escalados según Tailwind
- **Pesos:** 400, 500, 600, 700, 900

### Espaciado
- Márgenes aumentados para diseño aireado
- Gap between items: 8-20px
- Padding en secciones: 32-40px

---

## 📊 Estadísticas del Proyecto

- **Líneas de código:** ~2,500+
- **Componentes:** 10+
- **Rutas:** 8+
- **Modelos Prisma:** 7
- **APIs:** 1 (NextAuth)

---

## 🚀 Performance

### Optimizaciones Implementadas
- ✅ Next.js Static Generation
- ✅ Image Optimization
- ✅ Code Splitting
- ✅ CSS Minification

### Métricas Esperadas
- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

---

## 📞 Soporte Técnico

### Problemas Comunes

**Error: "Module not found '@/components'"**
- Solución: Verificar tsconfig.json paths

**Error: "prisma: command not found"**
- Solución: Ejecutar `npm install` o `npx prisma`

**OAuth no funciona**
- Solución: Verificar credenciales en .env.local

**Tailwind CSS no se aplica**
- Solución: Ejecutar `npm run tailwind:build`

---

## 📝 Licencia

Proyecto privado de Cristóbal Mella

---

## 🙋 Contribuciones

Para contribuir al proyecto:
1. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
2. Commit cambios (`git commit -am 'Agrega nueva caracteristica'`)
3. Push a la rama (`git push origin feature/nueva-caracteristica`)
4. Abre un Pull Request

---

## 📞 Contacto

- Email: cristobal.mella2715@gmail.com
- GitHub: [Tu usuario]
- Sitio: https://clubnovios.cl (próximamente)

---

**Última actualización:** Julio 2026
**Versión:** 1.0.0-beta
**Status:** En desarrollo activo 🚀

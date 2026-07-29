# 🎨 COMPONENTES REACT + TAILWINDCSS

## 📋 Contenido

- **9 componentes base** listos para usar
- **Dark mode automático** incluido
- **TypeScript completo** con tipos explícitos
- **Ejemplos de uso** para cada componente
- **Sin dependencias externas** (excepto lucide-react para iconos)

---

## 🚀 Instalación Rápida

### 1. Copiar componentes a tu proyecto

```bash
# Crear carpeta
mkdir -p src/components/ui
mkdir -p src/components/marketplace
mkdir -p src/components/common

# Copiar archivos
cp 01-ui-*.tsx src/components/ui/
cp 02-ui-*.tsx src/components/ui/
cp 03-ui-*.tsx src/components/ui/
cp 04-ui-*.tsx src/components/ui/
cp 05-ui-*.tsx src/components/ui/
cp 06-marketplace-*.tsx src/components/marketplace/
cp 07-marketplace-*.tsx src/components/marketplace/
cp 08-common-*.tsx src/components/common/
cp 09-common-*.tsx src/components/common/

# Copiar utilidades
mkdir -p src/lib/utils
mkdir -p src/lib/hooks
cp utils-cn.ts src/lib/utils/cn.ts
cp hook-useTheme.ts src/lib/hooks/useTheme.ts
```

### 2. Instalar dependencias

```bash
npm install lucide-react clsx tailwind-merge date-fns
# o
pnpm add lucide-react clsx tailwind-merge date-fns
```

### 3. Usar en tu proyecto

```tsx
import { Button } from '@/components/ui/01-ui-button';
import { Input } from '@/components/ui/02-ui-input';
import { Card, CardContent } from '@/components/ui/03-ui-card';
import { Badge } from '@/components/ui/04-ui-badge';
import { Rating } from '@/components/ui/05-ui-rating';
import { ProviderCard } from '@/components/marketplace/06-marketplace-provider-card';
import { ReviewCard } from '@/components/marketplace/07-marketplace-review-card';
import { Navbar } from '@/components/common/08-common-navbar';
import { HeroSection } from '@/components/common/09-common-hero';
```

---

## 📚 Componentes Incluidos

### 1. Button (01-ui-button.tsx)
Botón versátil con múltiples variantes

**Variantes:**
- `primary` - Principal (negro)
- `secondary` - Secundario (gris)
- `destructive` - Peligro (rojo)
- `ghost` - Sin fondo
- `outline` - Solo borde

**Tamaños:** `sm`, `md`, `lg`, `xl`

**Ejemplos:**
```tsx
<Button>Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive" size="lg">Delete</Button>
<Button isLoading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>
<Button fullWidth>Ancho completo</Button>
```

---

### 2. Input (02-ui-input.tsx)
Campo de entrada con validación integrada

**Props:**
- `label` - Etiqueta
- `error` - Mensaje de error
- `icon` - Icono a la izquierda
- `helperText` - Texto de ayuda
- `placeholder` - Placeholder

**Ejemplos:**
```tsx
<Input placeholder="Buscar..." />
<Input 
  label="Email" 
  type="email"
  error="Email inválido"
  required
/>
<Input 
  placeholder="Buscar proveedores..."
  icon={<SearchIcon />}
/>
<Input 
  helperText="Mínimo 8 caracteres"
  type="password"
/>
```

---

### 3. Card (03-ui-card.tsx)
Contenedor flexible para agrupar contenido

**Componentes:**
- `Card` - Contenedor principal
- `CardHeader` - Encabezado
- `CardContent` - Contenido
- `CardFooter` - Pie

**Props:**
- `hoverable` - Efecto hover
- `variant` - `default` o `glass`

**Ejemplos:**
```tsx
<Card hoverable>
  <CardHeader>
    <h2>Título</h2>
  </CardHeader>
  <CardContent>
    Contenido aquí
  </CardContent>
  <CardFooter>
    Acciones
  </CardFooter>
</Card>

<Card variant="glass">
  Efecto glassmorphism
</Card>
```

---

### 4. Badge (04-ui-badge.tsx)
Etiqueta pequeña para categorías y estados

**Variantes:**
- `default` - Gris
- `success` - Verde
- `warning` - Amarillo
- `error` - Rojo
- `premium` - Degradado naranja
- `verified` - Azul

**Tamaños:** `sm`, `md`

**Ejemplos:**
```tsx
<Badge>Nuevo</Badge>
<Badge variant="success">✓ Verificado</Badge>
<Badge variant="premium">✨ Premium</Badge>
<Badge variant="error" size="sm">Error</Badge>
```

---

### 5. Rating (05-ui-rating.tsx)
Sistema de 5 estrellas para calificaciones

**Props:**
- `value` - Calificación (0-5)
- `onChange` - Callback cuando cambia
- `interactive` - Permite interacción
- `readOnly` - Solo lectura
- `decimals` - Mostrar decimales
- `size` - `sm`, `md`, `lg`

**Ejemplos:**
```tsx
<Rating value={4} readOnly />

<Rating 
  value={3} 
  onChange={setRating} 
  interactive
/>

<Rating value={4.5} decimals size="lg" />

<Rating value={0} interactive readOnly={false} />
```

---

### 6. ProviderCard (06-marketplace-provider-card.tsx)
Card de proveedor para búsqueda y listados

**Props:**
- `provider` - Objeto de proveedor
- `featured` - Destacado
- `onFavoriteClick` - Callback de favorito
- `isFavorite` - Es favorito

**Estructura del provider:**
```typescript
{
  id: string;
  slug: string;
  businessName: string;
  logo?: string;
  coverImage?: string;
  city: string;
  commune?: string;
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  isPremium: boolean;
}
```

**Ejemplo:**
```tsx
<ProviderCard 
  provider={provider}
  onFavoriteClick={handleFavorite}
  isFavorite={favoriteIds.includes(provider.id)}
/>
```

---

### 7. ReviewCard (07-marketplace-review-card.tsx)
Muestra una opinión completa con respuesta

**Props:**
- `review` - Objeto de opinión
- `showProviderResponse` - Mostrar respuesta
- `onHelpful` - Callback de "útil"

**Estructura de review:**
```typescript
{
  id: string;
  title: string;
  content: string;
  rating: number;
  createdAt: Date;
  isVerifiedCustomer: boolean;
  helpful: number;
  notHelpful: number;
  author: { name: string; avatar?: string };
  images?: string[];
  providerResponse?: { content: string; createdAt: Date };
}
```

**Ejemplo:**
```tsx
<ReviewCard 
  review={review}
  showProviderResponse={true}
  onHelpful={handleHelpful}
/>
```

---

### 8. Navbar (08-common-navbar.tsx)
Barra de navegación principal (responsiva)

**Props:**
- `searchPlaceholder` - Placeholder del buscador
- `onSearch` - Callback de búsqueda

**Características:**
- ✅ Responsive (mobile + desktop)
- ✅ Búsqueda integrada
- ✅ Toggle de tema (light/dark)
- ✅ Menú móvil
- ✅ Navegación integrada

**Ejemplo:**
```tsx
<Navbar 
  searchPlaceholder="Buscar fotógrafos..."
  onSearch={handleSearch}
/>
```

---

### 9. HeroSection (09-common-hero.tsx)
Sección principal con buscador destacado

**Props:**
- `title` - Título principal
- `subtitle` - Subtítulo
- `backgroundImage` - Imagen de fondo

**Características:**
- ✅ Buscador integrado
- ✅ Selector de ciudad
- ✅ Búsquedas populares
- ✅ Estadísticas
- ✅ Gradiente elegante

**Ejemplo:**
```tsx
<HeroSection 
  title="¿Qué servicio buscas?"
  subtitle="Conecta con profesionales"
/>
```

---

## 🎯 Utilidades

### cn (utils-cn.ts)
Merge de clases Tailwind sin conflictos

```tsx
import { cn } from '@/lib/utils/cn';

// Resuelve conflictos automáticamente
cn('px-4', 'px-8')  // → 'px-8'
cn('flex', condition && 'hidden')  // Condicional
cn('text-base', 'text-lg text-sm')  // → 'text-sm'
```

---

### useTheme (hook-useTheme.ts)
Hook para manejar light/dark mode

```tsx
import { useTheme } from '@/lib/hooks/useTheme';

export function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

---

## 🎨 Sistema de Diseño

### Colores

**Light Mode:**
- Primary: `#000000` (Negro)
- Secondary: `#6B7280` (Gris)
- Accent: `#F59E0B` (Naranja)
- Success: `#10B981` (Verde)
- Error: `#EF4444` (Rojo)
- Background: `#FFFFFF` (Blanco)

**Dark Mode:**
Automático con clases `dark:*`

### Espaciado
```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
```

### Border Radius
```
sm:   4px
md:   8px
lg:   12px
xl:   16px
full: 50%
```

---

## 🔧 Mejores Prácticas

### 1. Importaciones
```tsx
// ✅ CORRECTO
import { Button } from '@/components/ui/01-ui-button';

// ❌ EVITAR
import Button from '@/components/ui/01-ui-button';
```

### 2. Props Booleanos
```tsx
// ✅ CORRECTO
<Button disabled>Text</Button>
<Input required />

// ❌ EVITAR
<Button disabled={true}>Text</Button>
```

### 3. Responsive
```tsx
// ✅ CORRECTO
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Componentes con full-width en mobile
<Button fullWidth className="md:w-auto">
  {children}
</Button>
```

### 4. Dark Mode
```tsx
// ✅ CORRECTO
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-black dark:text-white">
    Título
  </h1>
</div>
```

### 5. Composición
```tsx
// ✅ CORRECTO - Combina componentes
<Card>
  <CardHeader>
    <h2>Mi Card</h2>
  </CardHeader>
  <CardContent>
    <Input placeholder="..." />
    <Button>Enviar</Button>
  </CardContent>
</Card>
```

---

## 📱 Ejemplos Prácticos

### Página de Búsqueda

```tsx
'use client';

import { useState } from 'react';
import { Navbar } from '@/components/common/08-common-navbar';
import { HeroSection } from '@/components/common/09-common-hero';
import { ProviderCard } from '@/components/marketplace/06-marketplace-provider-card';

export default function SearchPage() {
  const [providers, setProviders] = useState([]);
  
  const handleSearch = async (query: string) => {
    const res = await fetch(`/api/providers/search?q=${query}`);
    setProviders(await res.json());
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map(provider => (
            <ProviderCard 
              key={provider.id}
              provider={provider}
            />
          ))}
        </div>
      </div>
    </>
  );
}
```

### Card de Perfil

```tsx
<Card hoverable>
  <CardHeader className="pb-0">
    <div className="flex items-center gap-4">
      <Image 
        src={provider.logo}
        alt={provider.businessName}
        width={60}
        height={60}
        className="rounded-lg"
      />
      <div>
        <h3 className="text-xl font-bold">
          {provider.businessName}
        </h3>
        <Rating value={provider.averageRating} readOnly />
      </div>
    </div>
  </CardHeader>

  <CardContent className="py-4">
    <p className="text-gray-700 dark:text-gray-300">
      {provider.description}
    </p>
  </CardContent>

  <CardFooter className="flex gap-2">
    <Button variant="primary" fullWidth>
      Cotizar
    </Button>
    <Button variant="outline" fullWidth>
      Guardar
    </Button>
  </CardFooter>
</Card>
```

---

## 🐛 Troubleshooting

**Problema:** Clases Tailwind no se aplican
**Solución:** Asegúrate que `tailwind.config.ts` incluye el path correcto:
```ts
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

**Problema:** Dark mode no funciona
**Solución:** Usa el hook `useTheme` en layout raíz:
```tsx
'use client';
import { useTheme } from '@/lib/hooks/useTheme';

export function RootLayout() {
  const { isMounted } = useTheme();
  if (!isMounted) return null;
  // ...
}
```

---

## 📦 Próximos Componentes

- [ ] Skeleton Loader
- [ ] Modal/Dialog
- [ ] Dropdown Menu
- [ ] Tabs
- [ ] Pagination
- [ ] Breadcrumb
- [ ] Toast Notifications
- [ ] Select/Combobox
- [ ] Checkbox
- [ ] Radio

---

## 💡 Tips

1. **Reutiliza componentes** - No repitas code, compón
2. **Props booleanas** - Usa `disabled`, `readOnly`, `required`
3. **Tipos TypeScript** - Aprovecha los tipos incluidos
4. **Dark mode** - Siempre incluye `dark:*` classes
5. **Responsive** - Mobile first: `md:`, `lg:`, `xl:`

---

**Todos los componentes están listos para producción.** ✅

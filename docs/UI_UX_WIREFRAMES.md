# 🎨 UI/UX WIREFRAMES Y ARQUITECTURA

## 🎯 Principios de Diseño

- **Minimalismo**: Espacio en blanco, tipografía clara
- **Consistencia**: Sistema de componentes unificado
- **Accesibilidad**: WCAG AA mínimo
- **Performance**: Lazy loading, skeleton screens
- **Responsivo**: Mobile-first, funciona en todos los dispositivos
- **Animaciones**: Suaves y propósito (no distractivas)

---

## 📱 Componentes Base

### Colores (Sistema de Tokens)

```tsx
// Light Mode
const colors = {
  primary: "#000000",      // Negro principal
  secondary: "#6B7280",    // Gris
  accent: "#F59E0B",       // Naranja (destacados)
  success: "#10B981",      // Verde
  warning: "#F59E0B",      // Naranja
  error: "#EF4444",        // Rojo
  background: "#FFFFFF",   // Blanco
  surface: "#F9FAFB",      // Gris claro
  border: "#E5E7EB",       // Gris muy claro
}

// Dark Mode
const darkColors = {
  primary: "#FFFFFF",
  secondary: "#9CA3AF",
  accent: "#F59E0B",
  background: "#0F172A",
  surface: "#1E293B",
  border: "#334155",
}
```

### Tipografía

```css
/* Font Stack */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;

/* Escalas de tamaño */
xs:  0.75rem (12px)   - Labels, helpers
sm:  0.875rem (14px)  - Small text, buttons
base: 1rem (16px)     - Body text
lg:  1.125rem (18px)  - Subheadings
xl:  1.25rem (20px)   - Section headers
2xl: 1.5rem (24px)    - Page headers
3xl: 1.875rem (30px)  - Hero titles
4xl: 2.25rem (36px)   - Main heroes
5xl: 3rem (48px)      - Home hero

/* Line Heights */
tight: 1.2     (para headings)
normal: 1.5    (para body)
relaxed: 1.75  (para readability)
```

### Espaciado (8px base)

```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
3xl:  64px
4xl:  96px
```

### Border Radius

```
sm:  4px   (inputs, small elements)
md:  8px   (cards, buttons)
lg:  12px  (modals, sections)
xl:  16px  (hero sections)
full: 50%  (avatars, badges)
```

### Shadows (Glassmorphism sutil)

```
xs:  0 1px 2px rgba(0,0,0,0.05)
sm:  0 1px 3px rgba(0,0,0,0.1)
md:  0 4px 6px rgba(0,0,0,0.1)
lg:  0 10px 15px rgba(0,0,0,0.1)
xl:  0 20px 25px rgba(0,0,0,0.1)
glass: backdrop-blur-xl, bg-white/80, border-1 border-white/20
```

---

## 📄 PANTALLAS PÚBLICAS

### 1. HOME PAGE
```
┌─────────────────────────────────────┐
│          NAVBAR + LOGO              │  ← Sticky top
├─────────────────────────────────────┤
│                                     │
│      ⭐ HERO SECTION GRANDE        │
│  "Encuentra los mejores servicios"  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ 🔍 BUSCADOR PRINCIPAL        │  │
│  │ ├─ Servicio (dropdown)       │  │
│  │ ├─ Ciudad (dropdown)         │  │
│  │ └─ [BUSCAR]                  │  │
│  └──────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ CATEGORÍAS POPULARES (6 cards)      │
│ [Fotógrafos] [DJ] [Banquetería] ... │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ PROVEEDORES DESTACADOS (8 cards)    │
│ ┌──────────┐ ┌──────────┐ ...      │
│ │ Imagen   │ │ Imagen   │          │
│ │ Nombre   │ │ Nombre   │          │
│ │⭐⭐⭐⭐⭐ │ │⭐⭐⭐⭐⭐ │          │
│ │ Ciudad   │ │ Ciudad   │          │
│ └──────────┘ └──────────┘          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ÚLTIMAS OPINIONES (4 cards)         │
│ "Excelente servicio - ⭐⭐⭐⭐⭐"  │
│ "Recomendado 100%" - Juan S.       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ¿CÓMO FUNCIONA? (3 steps)          │
│ ① Busca ② Compara ③ Contrata      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ PLANES PREMIUM (3 cards)            │
│ Free | Premium | Plus               │
│                                     │
├─────────────────────────────────────┤
│          CALL TO ACTION             │
│     "¿Eres proveedor? Registrate"   │
│                                     │
├─────────────────────────────────────┤
│             FOOTER                  │
│  Links, Legal, Social, Contact      │
└─────────────────────────────────────┘
```

### 2. BÚSQUEDA / RESULTADOS
```
┌─────────────────────────────────────┐
│          NAVBAR                     │
├─────────────────────────────────────┤
│                                     │
│ ┌──────────────────────────────┐   │
│ │ BUSCADOR CON FILTROS         │   │  ← Sticky top
│ │ [Fotografos] [Santiago] [Buscar]  │
│ └──────────────────────────────┘   │
│                                     │
├──────────────────┬──────────────────┤
│                  │                  │
│   SIDEBAR        │    RESULTADOS    │
│   (Filtros)      │                  │
│                  │  Mostrando 24    │
│ ☐ Premiums      │  resultados      │
│ ☐ Verificados   │                  │
│ ☐ Disponible hoy│  ┌───────────┐   │
│                  │  │ Card      │   │
│ 💰 Precio        │  │ Proveedor │   │
│ [₩ - ₩₩₩]       │  │ ⭐⭐⭐⭐⭐  │   │
│                  │  │ 24 opiniones   │
│ ⭐ Calificación  │  │ Premium ✓     │
│ [⭐⭐⭐⭐⭐]    │  └───────────┘   │
│                  │                  │
│ 🌍 Ubicación     │  [Pagination]   │
│                  │                  │
│ 🏷️ Promociones  │                  │
│                  │                  │
│ 🔄 Ordenar por:  │                  │
│ ⊙ Mejor rating  │                  │
│ ○ Más opiniones │                  │
│ ○ Más visitado  │                  │
│ ○ Más reciente  │                  │
│                  │                  │
└──────────────────┴──────────────────┘
│             FOOTER                  │
└─────────────────────────────────────┘
```

### 3. PERFIL DEL PROVEEDOR
```
┌─────────────────────────────────────┐
│          NAVBAR                     │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │   PORTADA (Background Image)  │ │
│  │                               │ │
│  │  [Logo]  Nombre Proveedor    │ │
│  │          ⭐⭐⭐⭐⭐ (127)     │ │
│  │          ✓ Verificado         │ │
│  │          ✨ Premium           │ │
│  │                               │ │
│  │  [Cotización] [Mensaje] [❤️] │ │
│  └───────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ TABS:                               │
│ [Info] [Galería] [Servicios]        │
│ [Opiniones] [Videos] [Horarios]     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ TAB: INFO                           │
│                                     │
│ 📝 DESCRIPCIÓN                      │
│ "Fotografía profesional con +5      │
│  años de experiencia..."            │
│                                     │
│ 📍 UBICACIÓN                        │
│ Santiago, Ñuñoa                     │
│ [Mapa]                              │
│                                     │
│ 📞 CONTACTO                         │
│ Teléfono: +56 2 1234 5678          │
│ Email: contacto@...                 │
│ WhatsApp: Enviar mensaje            │
│ Web: www.portfolio.com              │
│                                     │
│ 🕒 HORARIOS                         │
│ Lunes-Viernes: 09:00 - 18:00       │
│ Sábado: 10:00 - 14:00              │
│ Domingo: Cerrado                    │
│                                     │
│ 📱 REDES SOCIALES                   │
│ [Instagram] [Facebook] [LinkedIn]   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ TAB: GALERÍA                        │
│                                     │
│ ┌──────┬──────┬──────┐             │
│ │ IMG  │ IMG  │ IMG  │             │
│ ├──────┼──────┼──────┤             │
│ │ IMG  │ IMG  │ IMG  │ (Infinite)  │
│ ├──────┼──────┼──────┤             │
│ │ IMG  │ IMG  │ IMG  │             │
│ └──────┴──────┴──────┘             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ TAB: OPINIONES                      │
│                                     │
│ 📊 RESUMEN                          │
│ Promedio: 4.8/5 de 127 opiniones   │
│                                     │
│ ⭐⭐⭐⭐⭐ 85 (67%)                │
│ ⭐⭐⭐⭐☆ 32 (25%)                │
│ ⭐⭐⭐☆☆ 8  (6%)                 │
│ ⭐⭐☆☆☆ 2  (2%)                 │
│ ⭐☆☆☆☆ 0  (0%)                 │
│                                     │
│ ─────────────────────────────────  │
│                                     │
│ OPINIÓN 1                           │
│ [Avatar] Usuario                    │
│ ⭐⭐⭐⭐⭐  "Excelente"            │
│ "Superó mis expectativas..."        │
│ 📸 3 fotos | 15 días atrás         │
│ ✓ Cliente verificado                │
│                                     │
│ Respuesta del proveedor:            │
│ "¡Gracias! Fue un placer..."       │
│                                     │
│ ─────────────────────────────────  │
│                                     │
│ [Cargar más opiniones]              │
│                                     │
└─────────────────────────────────────┘
│             FOOTER                  │
└─────────────────────────────────────┘
```

---

## 🔐 PANTALLAS DE AUTENTICACIÓN

### 4. LOGIN
```
┌─────────────────────────────────────┐
│        MARKETPLACE LOGO             │
│                                     │
│     Inicia sesión en Marketplace    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ [Correo]        _____               │
│ [Contraseña]    _____               │
│                                     │
│ ☐ Recuérdame                       │
│                                     │
│ [INICIA SESIÓN]                     │
│                                     │
│ ¿Olvidaste la contraseña?           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ O CONTINÚA CON:                     │
│                                     │
│ [Google Logo] Inicia con Google     │
│ [Apple Logo]  Inicia con Apple      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ¿No tienes cuenta? Regístrate       │
│                                     │
└─────────────────────────────────────┘
```

### 5. REGISTRO
```
┌─────────────────────────────────────┐
│        MARKETPLACE LOGO             │
│                                     │
│ Crea tu cuenta en Marketplace       │
│                                     │
│ ¿Eres cliente o proveedor?          │
│                                     │
│ ⊙ Cliente    ○ Proveedor           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ [Nombre completo]    _____           │
│ [Correo electrónico] _____           │
│ [Contraseña]         _____           │
│ [Confirmar password] _____           │
│                                     │
│ ☐ Acepto los términos y condiciones │
│ ☐ Recibir emails con ofertas        │
│                                     │
│ [CREAR CUENTA]                      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ¿Ya tienes cuenta? Inicia sesión    │
│                                     │
└─────────────────────────────────────┘
```

---

## 📊 PANEL DE CLIENTE

### 6. DASHBOARD CLIENTE
```
┌─────────────────────────────────────┐
│  Logo  │  Búsqueda  │ Profile ⚙️    │
├─────────────────────────────────────┤
│                                     │
│ CLIENTE DASHBOARD                   │
│                                     │
│ Hola, [Nombre]! 👋                  │
│                                     │
│ [Botones tab]:                      │
│ [Inicio] [Favoritos] [Opiniones]    │
│ [Cotizaciones] [Configuración]      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ FAVORITOS (5)                       │
│ ┌─────────┐ ┌─────────┐ ...         │
│ │ Imagen  │ │ Imagen  │            │
│ │ Nombre  │ │ Nombre  │            │
│ │ ⭐⭐⭐  │ │ ⭐⭐⭐  │            │
│ │ ❤️ Ver │ │ ❤️ Ver │            │
│ └─────────┘ └─────────┘            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ COTIZACIONES RECIENTES              │
│ ┌───────────────────────────────┐   │
│ │ Proveedor | Fecha | Estado    │   │
│ ├───────────────────────────────┤   │
│ │ Fotógrafo │ 5 dic │ Respondida    │
│ │ Decoración│ 3 dic │ Pendiente     │
│ │ DJ        │ 1 dic │ Aceptada      │
│ └───────────────────────────────┘   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ OPINIONES HECHAS (3)                │
│ ┌───────────────────────────────┐   │
│ │ Proveedor | Rating | Fecha    │   │
│ ├───────────────────────────────┤   │
│ │ Fotógrafo │ ⭐⭐⭐⭐⭐ │ 5 dic │
│ │ DJ        │ ⭐⭐⭐⭐☆ │ 1 dic │
│ └───────────────────────────────┘   │
│                                     │
│ [Ver más...]                        │
│                                     │
└─────────────────────────────────────┘
```

---

## 🏢 PANEL DE PROVEEDOR

### 7. DASHBOARD PROVEEDOR
```
┌─────────────────────────────────────┐
│  Logo  │ Search  │ 🔔3 │ Profile⚙️  │
├──────────┬───────────────────────────┤
│          │                           │
│ SIDEBAR  │  PROVEEDOR DASHBOARD      │
│          │                           │
│ 🏠 Inicio│  Mi Negocio de Fotografía │
│ 👤 Perfil│                           │
│ 🖼️ Galería│  ┌──────┐ ┌──────┐       │
│ 💼 Servicios│ │12K   │ │4.8⭐  │      │
│ 💬 Opiniones│ │Visitas│ │Rating │      │
│ 📧 Mensajes│ └──────┘ └──────┘       │
│ 📋 Cotizaciones                     │
│ 📈 Estadísticas│ ┌──────┐ ┌──────┐   │
│ 💳 Facturación│ │87    │ │5 hoy │   │
│ 📦 Planes   │ │Favoritos│ │Mensajes│  │
│ ⚙️ Config   │ └──────┘ └──────┘   │
│            │                           │
│            │ ÚLTIMAS COTIZACIONES      │
│            │                           │
│            │ Estado: Pendiente (2)     │
│            │ 📋 Fotografia boda - 5d  │
│            │ 📋 Eventos corporativo-3d│
│            │                           │
│            │ Estado: Respondida (1)    │
│            │ 📋 Sesión fotos 15 días  │
│            │                           │
│            │ [Ver todas]               │
│            │                           │
└──────────┴───────────────────────────┘
│             FOOTER                  │
└─────────────────────────────────────┘
```

### 8. PERFIL DE PROVEEDOR (Editar)
```
┌──────────┬───────────────────────────┐
│ SIDEBAR  │ EDITAR MI PERFIL          │
│          │                           │
│ ⚙️ General│ ┌─────────────────────┐   │
│ 🖼️ Galería│ │ Logo (Subir imagen) │   │
│ 📸 Fotos │ └─────────────────────┘   │
│ 🎬 Videos│                           │
│ 💼 Servicios│ [Nombre del negocio]   │
│ 🕒 Horarios│ _______________         │
│ 📱 Redes  │                           │
│           │ [Descripción]             │
│           │ _______________           │
│           │                           │
│           │ [Correo]   ___________    │
│           │ [Teléfono] ___________    │
│           │ [WhatsApp] ___________    │
│           │                           │
│           │ 🏘️ UBICACIÓN              │
│           │ [Ciudad] ___________      │
│           │ [Dirección] ________      │
│           │                           │
│           │ REDES SOCIALES            │
│           │ Instagram: ________       │
│           │ Facebook:  ________       │
│           │ LinkedIn:  ________       │
│           │                           │
│           │ [GUARDAR CAMBIOS]         │
│           │                           │
└──────────┴───────────────────────────┘
```

---

## 👨‍💼 PANEL ADMINISTRADOR

### 9. ADMIN DASHBOARD
```
┌──────────┬───────────────────────────┐
│ SIDEBAR  │ ADMIN DASHBOARD           │
│          │                           │
│ 📊 Dashboard│ Estadísticas Generales   │
│ 👥 Usuarios │                         │
│ 🏢 Proveedores│ ┌─────┐ ┌─────┐      │
│ 📁 Categorías│ │1.2K │ │850  │       │
│ 💬 Opiniones │ │Usuaros│ │Proveedores
│ 🚩 Reportes │ └─────┘ └─────┘       │
│ 💳 Facturación│                     │
│ 🎯 Publicidad│ ┌─────┐ ┌─────┐      │
│ 📰 Contenido │ │4.2⭐ │ │142  │       │
│ 📈 Analytics │ │Rating│ │Reportes    │
│ ⚙️ Config   │ └─────┘ └─────┘       │
│            │                         │
│            │ USUARIOS ACTIVOS (7d)   │
│            │ [Gráfico de líneas]     │
│            │                         │
│            │ REPORTES PENDIENTES (5) │
│            │ [1. Proveedor spam]     │
│            │ [2. Opinión inapropiada]│
│            │ [3. Imágenes prohibidas]│
│            │                         │
│            │ [Ver todos]             │
│            │                         │
└──────────┴───────────────────────────┘
```

---

## 🔍 COMPONENTES CLAVE

### Card Proveedor
```
┌──────────────────┐
│   [Portada IMG]  │
├──────────────────┤
│ Logo: [IMG]      │
│ Nombre Negocio   │
│ ⭐⭐⭐⭐⭐ (124)  │
│ ✨ Premium ✓Ver  │
│ Ciudad, Comuna   │
│                  │
│ [Cotización] [❤️]│
└──────────────────┘
```

### Review Card
```
┌──────────────────────────┐
│ [Avatar] Nombre Usuario  │
│ ⭐⭐⭐⭐⭐ "Excelente"  │
│ 5 días atrás             │
│ ✓ Cliente verificado     │
│                          │
│ "Excelente fotografía,   │
│ profesional y puntual... │
│                          │
│ [📸] [❤️ 23] [👎 1]   │
└──────────────────────────┘
```

### Notification Toast
```
┌─────────────────────────────┐
│ ✅ ¡Cotización respondida!  │
│                             │
│    Aceptar    Descartar     │
└─────────────────────────────┘
```

---

## 🎨 TEMAS Y MODO OSCURO

Soporta Light Mode (default) y Dark Mode con:
- Transiciones suaves entre temas
- Respeta preferencia del sistema
- Persistencia en localStorage
- Variables CSS para fácil personalización

```tsx
// Implementación en Tailwind
<div className="bg-white dark:bg-slate-950">
  <h1 className="text-black dark:text-white">
    Título
  </h1>
</div>
```

---

## 📱 Breakpoints Responsivos

```
xs:   320px  (pequeños móviles)
sm:   640px  (móviles)
md:   768px  (tablets)
lg:   1024px (desktops)
xl:   1280px (desktops grandes)
2xl:  1536px (ultra ancho)
```

Diseño Mobile-First:
1. Diseña para móvil primero (320px)
2. Mejora para tablets (768px)
3. Optimiza para desktop (1024px+)

---

## 🎬 Animaciones Suaves

```tsx
// Fade in suave
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Contenido
</motion.div>

// Slide up con entradaSlide
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  Card
</motion.div>
```

---

## ✨ Efectos Visuales

### Glassmorphism (Sutil)
```css
.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}
```

### Gradient Hero
```css
.hero-gradient {
  background: linear-gradient(
    135deg,
    #000000 0%,
    #1e293b 50%,
    #0f172a 100%
  );
}
```

---

## 🚀 Performance UX

1. **Skeleton Screens**: Muestra placeholders mientras carga
2. **Lazy Loading**: Imágenes se cargan on-demand
3. **Infinite Scroll**: Carga más resultados automáticamente
4. **Optimistic Updates**: Actualizaciones inmediatas en UI
5. **Progressive Enhancement**: Funciona sin JavaScript


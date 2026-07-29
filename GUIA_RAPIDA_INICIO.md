# 🚀 GUÍA RÁPIDA DE INICIO

## ¿Por qué no funciona el frontend?

El proyecto necesita:
1. **Dependencias instaladas** (`pnpm install`)
2. **Base de datos configurada** (PostgreSQL)
3. **Variables de entorno** (.env.local)

---

## PASO 1: Instalar Dependencias

```bash
cd /Volumes/Franco-duro/marketplace-fase1

# Opción A: Usar pnpm (recomendado)
pnpm install

# Opción B: Usar npm
npm install

# Opción C: Usar yarn
yarn install
```

---

## PASO 2: Configurar Base de Datos

### Opción A: PostgreSQL Local (Mac)

```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar PostgreSQL
brew install postgresql@15

# Iniciar servicio
brew services start postgresql@15

# Crear base de datos
createdb marketplace

# Crear usuario (opcional)
createuser -d marketplace_user
```

### Opción B: Docker

```bash
# Crea un archivo docker-compose.yml si no existe
docker-compose up -d

# Espera 10 segundos a que se inicie
sleep 10
```

### Opción C: En línea (Supabase/Railway)

1. Ir a https://supabase.com o https://railway.app
2. Crear proyecto PostgreSQL
3. Copiar DATABASE_URL
4. Pegar en `.env.local`

---

## PASO 3: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tus valores
nano .env.local
```

**Mínimo requerido:**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace"
NEXTAUTH_SECRET="your-secret-key-here-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"
```

---

## PASO 4: Ejecutar Migraciones de BD

```bash
# Generar cliente Prisma
pnpm run db:generate

# Ejecutar migraciones
pnpm run db:migrate

# O empujar schema directo
pnpm run db:push
```

---

## PASO 5: Ejecutar en Desarrollo

```bash
pnpm run dev
```

**Debería ver:**
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## Abrir en Navegador

```
http://localhost:3000
```

Deberías ver:
- ✅ Navbar con búsqueda
- ✅ Hero section
- ✅ Categorías populares
- ✅ Proveedores destacados
- ✅ Estadísticas
- ✅ Footer

---

## Solución de Problemas

### Error: "Cannot find module 'next'"

```bash
# Instalar dependencias nuevamente
pnpm install --force
```

### Error: "DATABASE_URL not set"

```bash
# Verificar que .env.local existe y tiene DATABASE_URL
cat .env.local | grep DATABASE_URL

# Si no existe, copiar ejemplo
cp .env.example .env.local
```

### Error: "EADDRINUSE: address already in use :::3000"

Puerto 3000 ocupado. Usa otro:

```bash
pnpm dev -- -p 3001
```

### Error: "Prisma schema not found"

```bash
# Prisma necesita estar en la raíz
# Verifica que existe: prisma/schema.prisma

ls prisma/schema.prisma
```

---

## Rutas Disponibles

Una vez que funcione el servidor:

- 🏠 `http://localhost:3000/` - Home page
- 🔍 `http://localhost:3000/search` - Búsqueda
- 👤 `http://localhost:3000/providers/[slug]` - Perfil proveedor
- 💬 `http://localhost:3000/mensajeria` - Mensajería (requiere login)
- 📋 `http://localhost:3000/cotizaciones` - Cotizaciones (requiere login)
- ⭐ `http://localhost:3000/opiniones` - Opiniones (requiere login)
- 🔐 `http://localhost:3000/auth/login` - Login
- 📝 `http://localhost:3000/auth/register` - Registro

---

## Comandos Útiles

```bash
# Ver proceso en puerto 3000
lsof -i :3000

# Detener el servidor
# Presiona: Ctrl + C

# Limpiar caché
rm -rf .next

# Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Ver logs de Prisma
export DEBUG="prisma:*"

# Abrir studio de Prisma
pnpm prisma studio
```

---

## Estructura de Carpetas

```
marketplace-fase1/
├── app/              # Rutas de Next.js (App Router)
│   ├── layout.tsx    # Layout global
│   ├── page.tsx      # Home page
│   └── globals.css   # Estilos globales
├── components/       # Componentes React
│   ├── ui/           # Componentes base
│   ├── common/       # Componentes comunes
│   └── marketplace/  # Componentes específicos
├── lib/              # Lógica compartida
│   ├── validations/  # Esquemas Zod
│   ├── services/     # Server actions
│   └── hooks/        # Custom hooks
├── prisma/           # Configuración Prisma
│   └── schema.prisma # Schema de BD
├── public/           # Archivos estáticos
├── .env.local        # Variables de entorno (crear)
├── package.json      # Dependencias
└── tsconfig.json     # Configuración TypeScript
```

---

## Próximos Pasos

1. ✅ Instalar dependencias
2. ✅ Configurar BD
3. ✅ Configurar .env.local
4. ✅ Ejecutar migraciones
5. ✅ Iniciar servidor dev
6. ➡️ **Explorar la aplicación**
7. ➡️ Leer documentación de cada fase
8. ➡️ Realizar customizaciones

---

## Documentación

- `RESUMEN_COMPLETO.md` - Overview del proyecto
- `INDICE_COMPLETO_PROYECTO.md` - Índice detallado
- `README_PROYECTO_COMPLETO.md` - Guía completa
- `fase1-arquitectura/ARQUITECTURA.md` - Patrones técnicos
- `fase*/RESUMEN.md` - Resumen de cada fase

---

## Soporte Rápido

| Problema | Solución |
|----------|----------|
| No funciona nada | `pnpm install` |
| BD no conecta | Verificar `DATABASE_URL` en `.env.local` |
| Puerto 3000 ocupado | `pnpm dev -- -p 3001` |
| TypeScript errors | `pnpm run type-check` |
| Estilos no cargan | `pnpm run build` |

---

## Testing Rápido

Prueba estos comandos para verificar que todo funciona:

```bash
# Type check
pnpm run type-check

# Lint
pnpm run lint

# Build
pnpm run build

# Dev
pnpm run dev
```

---

**¡Listo! Tu marketplace debería estar corriendo en `http://localhost:3000`** 🎉

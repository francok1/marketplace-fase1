# 🚀 GUÍA DE SETUP - MARKETPLACE

## 📋 Requisitos Previos

- **Node.js**: v20+ (LTS recomendado)
- **pnpm**: v8+ (gestor de paquetes optimizado)
- **PostgreSQL**: v14+ (base de datos)
- **Git**: v2.40+ (control de versiones)
- **Docker** (opcional, para PostgreSQL en dev)

Verifica las versiones:
```bash
node --version    # v20.x.x
pnpm --version    # 8.x.x
psql --version    # psql (PostgreSQL) 14.x
```

---

## 📦 Instalación Inicial

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/marketplace.git
cd marketplace
```

### 2. Instalar dependencias
```bash
# Instala todas las dependencias de los workspaces
pnpm install

# Verifica que todo esté bien
pnpm --version
pnpm list --depth=0
```

---

## 🗄️ Configuración de Base de Datos

### Opción A: PostgreSQL local (recomendado para desarrollo)

#### En macOS (Homebrew)
```bash
# Instalar PostgreSQL
brew install postgresql@16

# Iniciar el servicio
brew services start postgresql@16

# Verificar que corre
brew services list | grep postgresql
```

#### En Windows (WSL2)
```bash
# En WSL2 Ubuntu
sudo apt update
sudo apt install postgresql postgresql-contrib

# Iniciar servicio
sudo service postgresql start
```

#### En Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Opción B: Docker (más fácil)

```bash
# Crear volumen
docker volume create marketplace_postgres_data

# Crear contenedor
docker run -d \
  --name marketplace_db \
  -e POSTGRES_USER=marketplace \
  -e POSTGRES_PASSWORD=dev_password \
  -e POSTGRES_DB=marketplace \
  -p 5432:5432 \
  -v marketplace_postgres_data:/var/lib/postgresql/data \
  postgres:16-alpine

# Verificar que corre
docker ps | grep marketplace_db

# Detener cuando termines
docker stop marketplace_db

# Reiniciar después
docker start marketplace_db
```

---

## 🔧 Variables de Entorno

### 1. Crear archivo `.env.local`

```bash
cp .env.example .env.local
```

### 2. Configurar variables

```bash
# Base de datos
DATABASE_URL="postgresql://marketplace:dev_password@localhost:5432/marketplace"

# NextAuth
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"

# OAuth (obtén las keys en Google Cloud Console)
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Stripe (obtén keys en dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# UploadThing (obtén en uploadthing.com)
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."

# Email (Resend)
RESEND_API_KEY="re_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NODE_ENV="development"
```

**Notas importantes:**
- `NEXTAUTH_SECRET`: Genéralo con `openssl rand -base64 32`
- Las keys de prueba (test keys) de Stripe funcionan en desarrollo
- En producción, **NUNCA** commits secrets. Usa un gestor de secretos.

---

## 🗄️ Configuración de Prisma

### 1. Generar cliente de Prisma
```bash
pnpm db:generate
```

### 2. Ejecutar migrations
```bash
# Primera vez (crear schema)
pnpm db:push

# Si necesitas migrar después
pnpm db:migrate
```

### 3. Seed de datos (categorías, ciudades)
```bash
pnpm db:seed
```

**Verifica que la BD se creó:**
```bash
psql -U marketplace -d marketplace

# En psql
\dt          # Lista todas las tablas
\d users     # Ver estructura de users
\q           # Salir
```

---

## 🏃 Ejecutar la Aplicación

### Desarrollo

```bash
# Terminal 1: Ejecutar dev server
pnpm dev

# Terminal 2 (opcional): Abrir Prisma Studio
pnpm exec prisma studio
```

La app estará disponible en:
- **Frontend**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555 (editor visual de BD)

### Verificar que todo funciona

1. Abre http://localhost:3000
2. Deberías ver la home
3. Intenta registrarte con Google (o email si está configurado)
4. Verifica los logs en la terminal

---

## 🧪 Testing

```bash
# Tests unitarios
pnpm test

# Tests end-to-end
pnpm test:e2e

# Coverage
pnpm test:coverage
```

---

## 📝 Linting y Formato

```bash
# Lint el código
pnpm lint

# Formatear automáticamente
pnpm lint:fix

# Type checking
pnpm type-check
```

---

## 📚 Estructura de Carpetas (post-setup)

```
marketplace/
├── apps/web/
│   ├── src/
│   │   ├── app/                 # App Router (página, layouts)
│   │   ├── components/          # Componentes React
│   │   ├── lib/                 # Lógica, utilidades, tipos
│   │   ├── hooks/               # React hooks personalizados
│   │   ├── styles/              # CSS global
│   │   └── instrumentation.ts   # Monitoring
│   ├── public/                  # Assets estáticos
│   ├── .env.local               # Variables de entorno
│   ├── next.config.js           # Configuración de Next.js
│   ├── tailwind.config.ts       # Configuración de TailwindCSS
│   ├── tsconfig.json            # TypeScript config
│   └── package.json
├── packages/
│   └── db/
│       ├── prisma/
│       │   ├── schema.prisma    # Schema de BD
│       │   ├── seed.ts          # Datos iniciales
│       │   └── migrations/      # Historial de cambios
│       └── package.json
├── pnpm-workspace.yaml          # Configuración de monorepo
├── .env.example                 # Template de env vars
└── package.json                 # Root package.json
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@prisma/client'"
```bash
pnpm db:generate
pnpm install
```

### Error: "Connection refused" a PostgreSQL
```bash
# Verifica que PostgreSQL está corriendo
docker ps            # Si usas Docker
ps aux | grep postgres  # Si está en tu máquina

# Verifica la CONNECTION_STRING
echo $DATABASE_URL
# Debería ser: postgresql://user:password@localhost:5432/dbname
```

### Error: "NextAuth secret not found"
```bash
# Asegúrate que .env.local tiene NEXTAUTH_SECRET
cat .env.local | grep NEXTAUTH_SECRET

# Si no lo tiene, genéralo:
openssl rand -base64 32 >> .env.local
```

### Error: "Prisma migration failed"
```bash
# Reset la BD (elimina todo)
pnpm exec prisma migrate reset

# O manualmente
pnpm exec prisma db push --force-reset
```

### Puerto 3000 ya en uso
```bash
# Ejecutar en otro puerto
pnpm dev -- -p 3001

# O matar el proceso
lsof -i :3000
kill -9 <PID>
```

---

## 🔐 Seguridad en Desarrollo

1. **Nunca** hagas commit de `.env.local`
2. **Nunca** uses keys reales de producción en desarrollo
3. Usa Stripe keys de **TEST** (pk_test_, sk_test_)
4. **Regenera** `NEXTAUTH_SECRET` antes de desplegar

---

## 📊 Verificación de Setup

Ejecuta este comando para verificar todo:

```bash
# Verificar versiones
echo "=== Versiones ===" && \
node --version && \
pnpm --version && \
psql --version && \
echo "=== BD Conexión ===" && \
psql -U marketplace -d marketplace -c "SELECT 1;" && \
echo "=== Prisma ===" && \
pnpm exec prisma --version && \
echo "✅ Setup completado!"
```

Deberías ver:
- ✅ Versiones de Node, pnpm, PostgreSQL
- ✅ Conexión exitosa a la BD
- ✅ Versión de Prisma
- ✅ Mensaje de éxito

---

## 🚀 Próximos Pasos

Después de completar el setup:

1. **Revisar la arquitectura**: Lee `PROJECT_STRUCTURE.md`
2. **Entender la BD**: Lee `DATABASE_DESIGN.md`
3. **Comenzar desarrollo**: Ve a `apps/web/src/app/page.tsx`
4. **Componentes**: Crea componentes en `src/components/`
5. **API Routes**: Agrega endpoints en `src/app/api/`

---

## 📖 Documentación Adicional

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

## ✅ Checklist Final

- [ ] Node.js v20+ instalado
- [ ] pnpm instalado
- [ ] PostgreSQL corriendo (local o Docker)
- [ ] `.env.local` creado con variables
- [ ] `pnpm install` ejecutado
- [ ] `pnpm db:push` ejecutado
- [ ] `pnpm db:seed` ejecutado
- [ ] `pnpm dev` funciona
- [ ] http://localhost:3000 abre correctamente
- [ ] Prisma Studio disponible en http://localhost:5555

**¡Listo para desarrollar! 🚀**

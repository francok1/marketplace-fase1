#!/bin/bash

echo "🚀 Iniciando configuración del Marketplace..."

# Paso 1: Instalar dependencias
echo "📦 Instalando dependencias..."
pnpm install

# Paso 2: Generar Prisma
echo "🗄️ Generando cliente Prisma..."
pnpm db:generate

# Paso 3: Verificar PostgreSQL
echo "🐘 Verificando PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL está instalado"
else
    echo "⚠️  PostgreSQL no está instalado. Instala PostgreSQL o usa Docker:"
    echo "   docker run -d --name marketplace_db -e POSTGRES_USER=marketplace -e POSTGRES_PASSWORD=dev_password -e POSTGRES_DB=marketplace -p 5432:5432 postgres:16-alpine"
fi

# Paso 4: Crear base de datos
echo "🔧 Configurando base de datos..."
pnpm db:push

echo "✅ Configuración completada!"
echo ""
echo "Para iniciar el servidor de desarrollo, ejecuta:"
echo "   pnpm dev"

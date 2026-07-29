#!/bin/bash

echo "🐘 Configurando PostgreSQL en macOS..."

# Verificar si Homebrew está instalado
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew no está instalado."
    echo "Instálalo desde: https://brew.sh"
    exit 1
fi

# Instalar PostgreSQL
echo "📥 Instalando PostgreSQL 16..."
brew install postgresql@16

# Iniciar servicio
echo "🚀 Iniciando PostgreSQL..."
brew services start postgresql@16

# Esperar un poco para que inicie
sleep 2

# Crear base de datos y usuario
echo "🗄️  Creando base de datos 'marketplace'..."
createdb marketplace 2>/dev/null || true

# Verificar la conexión
echo "✅ Verificando conexión..."
psql -d postgres -c "SELECT 1" > /dev/null 2>&1 && echo "✅ PostgreSQL está funcionando" || echo "❌ Error al conectar"

echo ""
echo "📝 Variables de entorno para .env:"
echo "DATABASE_URL=\"postgresql://\$(whoami)@localhost:5432/marketplace\""

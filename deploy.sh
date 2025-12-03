#!/bin/bash
# Script de Despliegue - Ejecutar antes de hacer push a GitHub

echo "🚀 Preparando para despliegue..."

# Verificar que exista package.json
if [ ! -f "package.json" ]; then
  echo "❌ Error: No se encuentra package.json"
  exit 1
fi

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Ejecutar tests
echo "🧪 Ejecutando tests..."
npm test

if [ $? -ne 0 ]; then
  echo "❌ Tests fallaron. Abortando despliegue."
  exit 1
fi

# Limpiar archivos temporales
echo "🧹 Limpiando archivos temporales..."
rm -rf node_modules/.cache
rm -rf coverage

echo "✅ Listo para desplegar!"
echo ""
echo "Próximos pasos:"
echo "1. git add ."
echo "2. git commit -m 'Desplegar a producción'"
echo "3. git push origin main"
echo ""
echo "Render desplegará automáticamente."

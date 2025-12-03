# 🎯 Plan de Acción - Migración a Dominio

## 📊 Estado Actual

```
LOCAL (localhost:5000)
        ↓
GITHUB (Repositorio)
        ↓
RENDER (Despliegue automático)
        ↓
DOMINIO (tu-app.onrender.com)
        ↓
DOMINIO PERSONALIZADO (opcional)
```

---

## ⚡ 3 Pasos Principales

### PASO 1: GitHub (5 min)
```bash
cd /ruta/a/tu/proyecto
git init
git add .
git commit -m "Inicial"
git remote add origin https://github.com/TU_USER/TU_REPO.git
git push -u origin main
```

**Resultado**: Tu código en GitHub ✅

---

### PASO 2: Render.com (5 min)
1. Accede a https://render.com
2. Sign up con GitHub
3. Click "New +" → "Web Service"
4. Selecciona tu repo
5. Render detecta `render.yaml`
6. Configura variables (MONGODB_URI)
7. Click "Create Web Service"

**Resultado**: Tu app en `https://counterpoint-app.onrender.com` ✅

---

### PASO 3: Testing (2 min)
```
Abre: https://counterpoint-app.onrender.com

Verifica:
✅ Página de login carga
✅ Puedes registrarte
✅ Puedes iniciar sesión
✅ Puedes crear encuesta
✅ Puedes votar
```

**Resultado**: Todo funciona en línea ✅

---

## 📋 Checklist Rápido

- [ ] Tests pasan: `npm test`
- [ ] App inicia: `npm start`
- [ ] Repo en GitHub
- [ ] Render conectado
- [ ] Variables configuradas
- [ ] App desplegada
- [ ] Tests en línea

---

## 🚀 Flujo de Trabajo Futuro

Después del primer despliegue:

```bash
# Hacer cambios locales
npm start  # Verifica que funciona

# Hacer commit
git add .
git commit -m "Nueva feature"

# Push a GitHub
git push

# ⏱️ Espera 1-2 minutos
# Render automáticamente:
# 1. Detecta push
# 2. Descarga código
# 3. npm install
# 4. npm start
# 5. Deploy nuevamente

# ✅ Tu app actualizada en línea
```

---

## 💰 Costos (Render.com)

| Plan | Precio | CPU | RAM | Ideal Para |
|------|--------|-----|-----|-----------|
| **Free** | $0 | 0.5 | 512MB | Desarrollo/Pruebas |
| **Pro** | $7/mes | 0.5 | 512MB | Producción ligera |
| **Premium** | $25+ | 1+ | 2GB+ | Apps grandes |

Para empezar, **Free tier** es suficiente.

---

## 📚 Documentos de Referencia

```
DESPLIEGUE_RAPIDO.md    ← Lee esto primero (5 min)
        ↓
DESPLIEGUE_GUIA.md      ← Más detalles
        ↓
CHECKLIST_DESPLIEGUE.md ← Verifica cada paso
```

---

## ✨ Beneficios de Este Setup

✅ **Automático**: Push → Deploy automático  
✅ **Gratuito**: Tier free disponible  
✅ **Seguro**: Certificado SSL incluido  
✅ **Escalable**: Sube de tier sin cambiar código  
✅ **Simple**: No necesita configuración complicada  

---

## 🆘 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| "Build failed" | Ver logs en Render, verificar npm install |
| "App Error" | Ver logs, revisar MONGODB_URI |
| "Cannot connect MongoDB" | Verificar IP whitelist en Atlas |
| "Timeout" | Esperar más, servidor gratuito es lento |

---

## 🎓 Próximos Pasos Opcionales

- **Dominio personalizado**: Comprar dominio + conectar en Render
- **Caché**: Configurar CDN para frontend
- **Monitoreo**: Alertas de error en Discord/Email
- **CI/CD**: GitHub Actions para tests automáticos
- **Bases de datos**: Migrar a Postgres/MySQL si necesitas

---

## 📞 Soporte

Si tienes dudas:
1. Revisa [DESPLIEGUE_RAPIDO.md](./DESPLIEGUE_RAPIDO.md)
2. Verifica [CHECKLIST_DESPLIEGUE.md](./CHECKLIST_DESPLIEGUE.md)
3. Ve logs en Render Dashboard

---

**¡Tu aplicación está lista para desplegar!** 🚀

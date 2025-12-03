# 🚀 Guía de Despliegue - Encuestas Web

Tu aplicación está lista para desplegar. Sigue estos pasos:

## ✅ Requisitos Previos

- Repositorio en GitHub
- Cuenta en [render.com](https://render.com)
- MongoDB Atlas configurado (ya lo tienes)

---

## 📍 OPCIÓN 1: Desplegar en Render.com (RECOMENDADO)

### Paso 1: Preparar GitHub
```bash
git init
git add .
git commit -m "Aplicación lista para desplegar"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 2: Crear Aplicación en Render
1. Accede a [render.com](https://render.com)
2. Haz clic en **"New +"** → **"Web Service"**
3. Selecciona **"Deploy from a Git repository"**
4. Conecta tu repositorio GitHub
5. Render detectará automáticamente `render.yaml`

### Paso 3: Configurar Variables de Entorno
En Render, añade estas variables:
- **PORT**: 10000 (ya está en render.yaml)
- **MONGODB_URI**: mongodb+srv://alvaro_db:12345@cluster0.woadz6f.mongodb.net/?appName=Cluster0

### Paso 4: Deploy Automático
Render desplegará automáticamente. Tu app estará disponible en:
```
https://counterpoint-app.onrender.com
```

---

## 📍 OPCIÓN 2: Desplegar en Railway.app

### Paso 1: Crear Cuenta
Accede a [railway.app](https://railway.app)

### Paso 2: Crear Nuevo Proyecto
1. Haz clic en **"Start a New Project"**
2. Selecciona **"Deploy from GitHub"**
3. Conecta tu repositorio

### Paso 3: Configurar Variables
En Railway, añade:
- **PORT**: 3000
- **MONGODB_URI**: mongodb+srv://alvaro_db:12345@cluster0.woadz6f.mongodb.net/?appName=Cluster0

### Paso 4: Deploy
Railway desplegará automáticamente y tu app estará en:
```
https://[tu-proyecto].railway.app
```

---

## 📍 OPCIÓN 3: Desplegar en Heroku (DEPRECATED - No recomendado)

Heroku terminó su free tier, pero puedes usar:
- Koyeb (alternativa gratuita)
- Cyclic (Node.js gratis)

---

## 🔗 Dominio Personalizado (Opcional)

Después de desplegar, puedes conectar tu dominio propio:

### En Render:
1. Settings → Custom Domain
2. Añade tu dominio
3. Actualiza DNS records en tu registrador

Ejemplo de DNS records (en tu registrador como GoDaddy):
```
CNAME: www → counterpoint-app.onrender.com
CNAME: @ → counterpoint-app.onrender.com
```

---

## ✨ Cambios Realizados en tu Código

✅ **index.js**: Actualizado para escuchar en `0.0.0.0:PORT`
✅ **render.yaml**: Ya está configurado
✅ **URLs Frontend**: Ya usan rutas relativas `/api`
✅ **CORS**: Ya está habilitado para cualquier origen

---

## 🧪 Verificar que Todo Funcione

Después de desplegar, verifica:

```bash
# Prueba API
curl https://tu-dominio.onrender.com/api/encuestas

# Prueba Frontend
Abre https://tu-dominio.onrender.com en el navegador
```

---

## ⚠️ Troubleshooting

### Error: "Cannot connect to database"
- Verifica que MONGODB_URI está correctamente configurada
- Asegúrate de que MongoDB Atlas permite conexiones externas

### Error: "Port already in use"
- Render maneja puertos automáticamente
- No necesitas especificar puerto en el código

### Aplicación lenta al iniciar
- Primer inicio puede tardar 30-60 segundos
- Los contenedores gratuitos en Render pueden ser lentos

---

## 📊 Monitoreo

### En Render:
1. Dashboard → Logs: Ve logs de tu aplicación
2. Settings → Auto-Deploy: Configura despliegue automático con cada push

### En Railway:
1. Logs tab: Ve logs en tiempo real
2. Deployments: Historial de despliegues

---

## 💡 Próximos Pasos

1. ✅ Sube código a GitHub
2. ✅ Crea cuenta en Render/Railway
3. ✅ Conecta tu repo
4. ✅ Configura variables de entorno
5. ✅ Deploy
6. ✅ (Opcional) Conecta dominio personalizado

¿Necesitas ayuda con algún paso específico?

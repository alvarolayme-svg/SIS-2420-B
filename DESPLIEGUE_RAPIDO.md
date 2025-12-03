# 🎯 REFERENCIA RÁPIDA - Despliegue en 5 Minutos

## ⚡ Pasos Rápidos (Render.com)

### 1️⃣ GitHub
```bash
git init
git add .
git commit -m "Inicial"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### 2️⃣ Render.com
1. Accede a [render.com](https://render.com)
2. Sign up / Sign in
3. Click "New +" → "Web Service"
4. Select "Deploy from Git repo"
5. Authorize GitHub
6. Select your repository

### 3️⃣ Configurar Render
- **Name**: counterpoint-app
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Region**: Frankfurt (o tu región más cercana)

### 4️⃣ Variables de Entorno
Haz click en "Add Environment Variable":
- **PORT**: 10000
- **MONGODB_URI**: mongodb+srv://alvaro_db:12345@cluster0.woadz6f.mongodb.net/?appName=Cluster0

### 5️⃣ Deploy
Click en "Create Web Service"

**¡Espera 2-5 minutos!**

Tu app estará en: `https://counterpoint-app.onrender.com`

---

## ✅ Verificar que Funcione

```
https://tu-dominio.onrender.com
```

Deberías ver tu página de login.

---

## 🔄 Actualizar Aplicación

Después del primer despliegue, cualquier push a GitHub desplegará automáticamente:

```bash
# Hacer cambios...
git add .
git commit -m "Descripción de cambios"
git push
# ✅ Render automáticamente redesplegará
```

---

## ⚠️ IMPORTANTE

✅ El `render.yaml` ya está configurado
✅ Las URLs usan rutas relativas `/api`
✅ CORS está habilitado
✅ MongoDB está conectado

**No necesitas cambiar nada más en el código.**

---

## 💰 Costos (Render.com)

- **Tier Gratuito**: $0/mes (pero con limitaciones)
  - Contenedor con 0.5 CPU
- **Tier Pro**: $7/mes (recomendado para producción)
  - Mejor performance
  - Sin pausas automáticas

---

## 🆘 Si Algo Falla

### Ver Logs:
En Render Dashboard → Logs

### Problemas Comunes:

**"Build failed"**
- Verifica que `npm install` funciona localmente
- Revisa que no haya errores de sintaxis

**"Application Error"**
- Ver logs en Render
- Verificar que MONGODB_URI está correcta

**"Cannot connect to MongoDB"**
- En MongoDB Atlas, asegúrate que la IP de Render está en Whitelist
- Usa `0.0.0.0/0` para permitir cualquier IP (desarrollo)

---

## 🎓 Siguiente: Dominio Personalizado

Cuando quieras un dominio como `www.misencuestas.com`:

1. Compra dominio en GoDaddy, Namecheap, etc.
2. En Render → Settings → Custom Domain
3. Actualiza DNS records en tu registrador
4. Espera 24-48 horas para propagación DNS

---

¿Necesitas ayuda con algo específico? 📞

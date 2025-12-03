# ✅ Checklist de Despliegue

## Pre-Despliegue (Local)

- [ ] Tests pasan: `npm test`
- [ ] Aplicación inicia: `npm start`
- [ ] Frontend accesible en `http://localhost:5000`
- [ ] Login funciona
- [ ] Crear encuesta funciona
- [ ] Votar funciona
- [ ] Comentarios funcionan

## Preparación Git

- [ ] Crear repositorio en GitHub
- [ ] `.gitignore` está presente
- [ ] `node_modules` no está en Git
- [ ] `.env` NO está en el repo (usar `.env.example`)
- [ ] Todos los cambios commiteados

```bash
git status  # No debe haber archivos sin trackear importantes
```

## Código Listo

- [ ] `index.js` escucha en `0.0.0.0`
- [ ] `render.yaml` está configurado
- [ ] `db.js` usa `process.env.MONGODB_URI`
- [ ] URLs frontend usan rutas relativas `/api`
- [ ] CORS está habilitado

## Render.com Setup

- [ ] Cuenta creada en render.com
- [ ] GitHub conectado a Render
- [ ] Repositorio visible en Render

## Crear Web Service en Render

- [ ] Click "New +" → "Web Service"
- [ ] Select GitHub repo
- [ ] Name: `counterpoint-app`
- [ ] Environment: `node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`

## Variables de Entorno en Render

- [ ] PORT = 10000
- [ ] NODE_ENV = production
- [ ] MONGODB_URI = (tu URI de MongoDB Atlas)

## Verificaciones Post-Despliegue

### 1. Aplicación Levantó
- [ ] Ver logs en Render (sin errores)
- [ ] URL funciona: `https://counterpoint-app.onrender.com`

### 2. Frontend
- [ ] Página de login carga
- [ ] Se ve correctamente
- [ ] No hay errores en console (F12 → Console)

### 3. Funcionalidad
- [ ] Login funciona
- [ ] Crear encuesta funciona
- [ ] Votar funciona
- [ ] Comentarios funcionan
- [ ] API endpoints responden

### 4. Base de Datos
- [ ] Usuarios se guardan
- [ ] Encuestas se guardan
- [ ] Votos se guardan

## MongoDB Atlas Checklist

- [ ] Whitelist includes Render IP (use `0.0.0.0/0` para desarrollo)
- [ ] Database user tiene permisos correctos
- [ ] Connection string es correcta

## Troubleshooting

Si algo falla:

### Build Failed
```bash
# Verificar localmente
npm install
npm test
# Ver qué falla
```

### Application Error
```bash
# Ver logs en Render Dashboard
# Click en tu app → Logs
```

### MongoDB Connection Error
```bash
# Verificar MongoDB URI
# Verificar IP whitelist en Atlas
# Verificar credenciales
```

### Rutas no funcionan
```bash
# Verificar que CORS está habilitado
# Verificar que API URL es `/api`
```

## Despliegue Futuro

Después del primer despliegue:

```bash
# Hacer cambios...
git add .
git commit -m "Descripción"
git push origin main
# ✅ Render automáticamente redesplegará
```

## Dominio Personalizado (Opcional)

Cuando todo esté funcionando:

1. Compra dominio
2. En Render → Settings → Custom Domain
3. Añade tu dominio
4. Actualiza DNS records en registrador
5. Espera propagación DNS (24-48h)

## Monitoreo Continuo

- [ ] Verificar logs regularmente en Render
- [ ] Configurar notificaciones de error (si disponible)
- [ ] Mantener MongoDB Atlas actualizado
- [ ] Revisar performance en Render dashboard

---

**Cuando todos los ✅ estén marcados, ¡tu app está lista para producción!**

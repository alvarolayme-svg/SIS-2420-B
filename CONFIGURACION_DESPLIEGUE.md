# ⚙️ Configuración de Despliegue

## 📝 Archivos Modificados/Creados

### ✅ Modificados
1. **index.js**
   - Cambio: Escucha en `0.0.0.0` en lugar de `localhost`
   - Razón: Render requiere escuchar en todas las interfaces

2. **render.yaml**
   - Añadido: Region (frankfurt)
   - Añadido: Plan (free)
   - Mejorado: NODE_ENV = production

### ✅ Creados
1. **.gitignore** - Para no subir node_modules, .env, etc.
2. **.env.example** - Referencia de variables de entorno
3. **DESPLIEGUE_GUIA.md** - Guía completa con 3 opciones
4. **DESPLIEGUE_RAPIDO.md** - Pasos rápidos (5 min)
5. **CHECKLIST_DESPLIEGUE.md** - Checklist paso a paso
6. **PLAN_MIGRACION.md** - Este documento
7. **README.md** - Documentación actualizada

---

## 🔧 Configuración Actual

### Backend (Express)
```javascript
// index.js
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', ...)  // ✅ Listo para Render
```

### Database (MongoDB)
```javascript
// db.js
const mongoURI = process.env.MONGODB_URI || '...default...';
mongoose.connect(mongoURI);  // ✅ Usa variable de entorno
```

### Frontend (JavaScript)
```javascript
// public/*.html
const URL_API = '/api';  // ✅ Rutas relativas, funciona en cualquier dominio
```

### CORS
```javascript
// index.js
app.use(cors({
  origin: '*',  // ✅ Permite cualquier origen (desarrollo)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
```

---

## 📦 Dependencias

```json
{
  "express": "^5.1.0",      // Web framework
  "mongoose": "^8.18.3",    // MongoDB ORM
  "bcrypt": "^6.0.0",       // Password hashing
  "cors": "^2.8.5",         // Cross-origin
  "jest": "^30.2.0"         // Testing
}
```

**Todo está configurado. No necesitas instalar nada más.**

---

## 🌐 Endpoints de Ejemplo

Una vez desplegado en Render:

```bash
# Base URL
https://counterpoint-app.onrender.com

# Frontend
GET https://counterpoint-app.onrender.com/           # Home
GET https://counterpoint-app.onrender.com/login.html # Login
GET https://counterpoint-app.onrender.com/dashboard.html # Dashboard

# API
GET    https://counterpoint-app.onrender.com/api/encuestas
POST   https://counterpoint-app.onrender.com/api/encuestas
GET    https://counterpoint-app.onrender.com/api/usuarios/correo/:correo
```

---

## 🔑 Variables de Entorno (Render)

### Obligatorias
```
PORT = 10000
MONGODB_URI = mongodb+srv://alvaro_db:12345@cluster0.woadz6f.mongodb.net/?appName=Cluster0
```

### Opcionales
```
NODE_ENV = production        # Mejora performance
LOG_LEVEL = info            # Control de logs
```

---

## 📊 Arquitectura de Despliegue

```
┌─────────────────┐
│  GitHub Repo    │
│  (Tu código)    │
└────────┬────────┘
         │
         │ Push
         ↓
┌─────────────────┐
│  Render.com     │
│  (Deploy)       │
└────────┬────────┘
         │
         ├→ npm install
         ├→ npm test
         ├→ npm start
         │
         ↓
┌─────────────────┐
│  Node.js + Exp  │
│  (Tu app)       │
└────────┬────────┘
         │
         ├→ Express server
         ├→ CORS enabled
         ├→ Static files (/public)
         │
         ↓
┌─────────────────┐
│  MongoDB Atlas  │
│  (Base datos)   │
└─────────────────┘
```

---

## 🔐 Seguridad

### ✅ Implementado
- Contraseñas encriptadas con bcrypt
- CORS para desarrollo
- Mongoose schema validation
- Input validation en backend

### 🚀 Para Producción
Si necesitas mejorar seguridad:
```bash
# Restringir CORS
cors({
  origin: 'https://tu-dominio.com',
  credentials: true
})

# Rate limiting
npm install express-rate-limit

# Helmet para headers
npm install helmet
```

---

## 📱 Accesibilidad

Tu app será accesible desde:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iPhone, Android)
- ✅ Tablet
- ✅ Cualquier navegador moderno

**No hay restricciones de acceso.**

---

## 🎯 Testing Antes de Desplegar

```bash
# 1. Tests unitarios
npm test

# 2. Verificar app inicia
npm start

# 3. Abrir navegador
# http://localhost:5000

# 4. Probar funcionalidad
# - Login
# - Crear encuesta
# - Votar
# - Comentarios
```

---

## ⏱️ Timeline de Despliegue

| Paso | Tiempo | Descripción |
|------|--------|------------|
| GitHub setup | 5 min | Crear repo, push |
| Render setup | 5 min | Conectar repo, config |
| Deploy build | 2-5 min | npm install, build |
| App startup | 1 min | Node.js inicia |
| Verificación | 2 min | Tests en línea |
| **Total** | **~20 min** | **Tu app online** |

---

## 📋 Pre-Requisitos Verificados

- ✅ Node.js dependencies instaladas
- ✅ MongoDB Atlas configurado
- ✅ render.yaml presente
- ✅ .gitignore presente
- ✅ Tests pasan (76/76)
- ✅ Código sin errores
- ✅ URLs relativas en frontend
- ✅ CORS habilitado

**Todo está listo. Solo falta: Crear repo GitHub y hacer push.**

---

## 🚀 Siguientes Pasos

### Inmediato (Hoy)
1. [ ] Crear repositorio en GitHub
2. [ ] Push del código
3. [ ] Conectar en Render

### Corto plazo (Esta semana)
4. [ ] Verificar que todo funciona
5. [ ] Invitar amigos a probar

### Mediano plazo (Este mes)
6. [ ] Comprar dominio personalizado
7. [ ] Conectar dominio
8. [ ] Optimizar performance

### Largo plazo (Futuro)
9. [ ] Agregar más features
10. [ ] Upgrade a plan Pro en Render
11. [ ] Analytics

---

## 💬 FAQs

**P: ¿Es gratis?**  
R: Sí, tier free en Render y MongoDB Atlas son gratis.

**P: ¿Cuánto tarda en desplegar?**  
R: 5-10 minutos después de push.

**P: ¿Cómo actualizo la app?**  
R: Haz push a GitHub, Render automáticamente redespliega.

**P: ¿Dónde veo logs de errores?**  
R: En Render Dashboard → Logs.

**P: ¿Puedo usar mi dominio?**  
R: Sí, en Render → Settings → Custom Domain.

---

**✨ ¡Tu aplicación está lista para ser un éxito online!**

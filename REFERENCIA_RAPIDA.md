# 🔖 Referencia Rápida - Comandos y URLs

## 🏠 Documentación (Lee en Este Orden)

```
1. RESUMEN_EJECUTIVO.md      ← EMPIEZA AQUÍ (2 min)
2. PLAN_MIGRACION.md         ← Entender el plan (3 min)
3. DESPLIEGUE_RAPIDO.md      ← Pasos para desplegar (5 min)
4. CHECKLIST_DESPLIEGUE.md   ← Verificar cada paso (10 min)
5. INDICE.md                 ← Acceso a toda la docs
```

---

## 💻 Comandos Locales

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ejecutar tests en watch mode
npm run test:watch

# Ver cobertura de tests
npm run test:coverage

# Iniciar servidor
npm start

# Iniciar servidor en otro puerto
PORT=3000 npm start

# Ver versión de Node
node --version

# Ver versión de npm
npm --version
```

---

## 🌐 URLs Importantes

### Desarrollo
```
http://localhost:5000           Home
http://localhost:5000/login.html        Login
http://localhost:5000/register.html     Registro
http://localhost:5000/dashboard.html    Dashboard
http://localhost:5000/encuestas.html    Crear Encuestas

API:
http://localhost:5000/api/encuestas     GET all surveys
http://localhost:5000/api/usuarios/     User endpoints
```

### Producción (Después de Desplegar)
```
https://counterpoint-app.onrender.com           Home
https://counterpoint-app.onrender.com/login.html        Login
https://counterpoint-app.onrender.com/register.html     Registro
https://counterpoint-app.onrender.com/dashboard.html    Dashboard
https://counterpoint-app.onrender.com/encuestas.html    Crear Encuestas

API:
https://counterpoint-app.onrender.com/api/encuestas     GET all surveys
```

---

## 🔧 API Endpoints

### Usuarios
```
POST   /api/usuarios/registro
       {nombre, correo, contraseña}
       
POST   /api/usuarios/login
       {correo, contraseña}
       
GET    /api/usuarios/correo/:email
       (devuelve usuario)
```

### Encuestas
```
POST   /api/encuestas
       {titulo, descripcion, creador, opciones}
       
GET    /api/encuestas
       (devuelve todas)
       
GET    /api/encuestas/:id
       (devuelve una)
       
PUT    /api/encuestas/:id
       {titulo, descripcion, opciones}
       
DELETE /api/encuestas/:id
       
POST   /api/encuestas/:id/votar
       {opcionIndex, usuarioCorreo}
```

### Comentarios
```
POST   /api/comentarios
       {usuario, contenido, encuestaId}
       
GET    /api/comentarios/:encuestaId
       (devuelve comentarios)
       
PUT    /api/comentarios/:id
       {contenido}
       
DELETE /api/comentarios/:id
```

---

## 🔑 Variables de Entorno

```bash
# Desarrollo (.env)
PORT=5000
MONGODB_URI=mongodb+srv://alvaro_db:12345@cluster0.woadz6f.mongodb.net/?appName=Cluster0
NODE_ENV=development

# Producción (Render Dashboard)
PORT=10000
MONGODB_URI=mongodb+srv://alvaro_db:12345@cluster0.woadz6f.mongodb.net/?appName=Cluster0
NODE_ENV=production
```

---

## 📁 Estructura de Carpetas

```
proyecto/
├── public/                    Frontend files
├── controllers/               HTTP logic
├── services/                  Business logic
├── models/                    Schemas
├── routes/                    API routes
├── __tests__/                 Unit tests
├── index.js                   Express server
├── db.js                      MongoDB connection
├── package.json               Dependencies
├── render.yaml                Render config
└── docs/                      Documentation
```

---

## 🐛 Debugging

### Ver Logs
```bash
# Local
npm start
# Los logs aparecen en la terminal

# En Render
# Dashboard → Click en app → Logs
```

### Ver Errores en Browser
```
F12 → Console tab
Muestra errores de JavaScript
```

### Ver Network Requests
```
F12 → Network tab
Muestra todas las peticiones API
```

---

## 📊 Estructura de Datos

### Usuario
```javascript
{
  _id: ObjectId,
  nombre: String,
  correo: String,
  Password: String (encrypted),
  rol: String (default: "usuario")
}
```

### Encuesta
```javascript
{
  _id: ObjectId,
  titulo: String,
  descripcion: String,
  creador: String,
  opciones: [{
    texto: String,
    votos: Number
  }],
  votantes: [String],      // emails de votantes
  votosUsuario: {           // {email: opcionIndex}
    "user@email.com": 0
  }
}
```

### Comentario
```javascript
{
  _id: ObjectId,
  usuario: String,
  contenido: String,
  encuestaId: ObjectId,
  createdAt: Date
}
```

---

## 🎨 CSS Classes (Frontend)

```html
<!-- Dashboard -->
.btnCerrarSesion
.btnVotar
.btnEditar
.btnEliminar
.btnComentario

<!-- Forms -->
.formInput
.formButton
.formError
.formSuccess

<!-- Modals -->
.modal
.modalContenido
.modalBotones

<!-- Cards -->
.encuestaCard
.opcionCard
.comentarioCard
```

---

## 🚀 Despliegue en 30 Segundos

1. `git push` a GitHub
2. Ve a https://render.com
3. Conecta tu repo
4. Añade MONGODB_URI
5. Click "Deploy"
6. Espera 5 minutos
7. ✅ Online en `https://counterpoint-app.onrender.com`

---

## ✅ Testing

```bash
# Todos los tests
npm test

# Tests de un archivo
npm test UsuarioManager

# Tests en watch mode
npm run test:watch

# Con cobertura
npm run test:coverage

# Resultado esperado
Test Suites: 6 passed, 6 total
Tests: 76 passed, 76 total
```

---

## 🔐 Seguridad

```javascript
// Contraseñas encriptadas con bcrypt
// CORS habilitado
// Validación en frontend y backend
// MongoDB escapes queries automáticamente
// SSL/HTTPS en Render
```

---

## 📱 Responsive Breakpoints

```css
Mobile:    < 768px
Tablet:    768px - 1024px
Desktop:   > 1024px
```

---

## 🔄 Proceso de Actualización

```bash
# Local
git add .
git commit -m "Descripción"
git push origin main

# Render automáticamente:
# 1. Detecta push
# 2. npm install
# 3. npm test
# 4. npm start
# 5. Deploy

# En 2-5 minutos está online ✅
```

---

## 💡 Tips Útiles

```
// Ver cambios sin pushear
git status

// Ver cambios en un archivo
git diff archivo.js

// Ver último commit
git log --oneline

// Actualizar local desde remoto
git pull

// Crear rama nueva (para features)
git checkout -b feature/nueva-feature
```

---

## 🎯 URLs Importantes

```
GitHub:           https://github.com
Render:           https://render.com
MongoDB Atlas:    https://cloud.mongodb.com
Node.js:          https://nodejs.org
NPM:              https://www.npmjs.com
Jest:             https://jestjs.io
Express:          https://expressjs.com
Mongoose:         https://mongoosejs.com
```

---

## 📚 Archivos Principales

```
index.js              ← Inicia Express
db.js                 ← Conecta MongoDB
routes/index.js       ← Define endpoints
controllers/          ← Lógica HTTP
services/             ← Lógica negocio
models/               ← Esquemas
__tests__/            ← 76 tests
public/               ← HTML frontend
render.yaml           ← Config Render
package.json          ← Dependencias
```

---

## 🚀 Próximo Paso

**Lee: [DESPLIEGUE_RAPIDO.md](./DESPLIEGUE_RAPIDO.md)**

Todo lo que necesitas en 5 minutos.

---

**Última actualización: Diciembre 3, 2025**

# 📊 Sistema de Encuestas Web

Aplicación completa de encuestas con React-like frontend y Node.js backend.

## ✨ Características

✅ **Autenticación**: Login y registro con contraseñas encriptadas  
✅ **Crear Encuestas**: Los usuarios pueden crear sus propias encuestas  
✅ **Votar**: Sistema de votación con seguimiento de votos  
✅ **Comentarios**: Los usuarios pueden comentar en encuestas  
✅ **Dashboard**: Panel de control personal  
✅ **Responsive**: Funciona en desktop y móvil  

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose ORM
- **Testing**: Jest (76+ tests)
- **Security**: bcrypt para hashing de contraseñas

## 📦 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO

# Instalar dependencias
npm install

# Configurar variables de entorno (crear .env)
cp .env.example .env

# Iniciar servidor
npm start
```

Abre `http://localhost:5000` en tu navegador.

## 🧪 Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch (reexecuta al cambiar archivos)
npm run test:watch

# Coverage de tests
npm run test:coverage
```

## 🚀 Despliegue

### Opción 1: Render.com (RECOMENDADO)

[Ver guía completa en DESPLIEGUE_RAPIDO.md](./DESPLIEGUE_RAPIDO.md)

En resumen:
1. Push a GitHub
2. Conecta repo en Render
3. Añade variables de entorno
4. Deploy automático

Tu app estará en: `https://counterpoint-app.onrender.com`

### Opción 2: Railway.app

Similar a Render pero con interfaz diferente.

### Opción 3: Dominio Personalizado

[Ver DESPLIEGUE_GUIA.md](./DESPLIEGUE_GUIA.md) para conectar tu dominio propio.

## 📁 Estructura del Proyecto

```
├── public/              # Archivos frontend (HTML)
│   ├── index.html      # Home page
│   ├── login.html      # Login page
│   ├── register.html   # Registro page
│   ├── dashboard.html  # Dashboard principal
│   └── encuestas.html  # Crear encuestas
├── controllers/         # Lógica HTTP (req/res)
│   ├── EncuestaController.js
│   ├── UsuarioController.js
│   └── ComentarioController.js
├── services/            # Lógica de negocio
│   ├── EncuestaManager.js
│   ├── UsuarioManager.js
│   └── ComentarioManager.js
├── models/              # Esquemas Mongoose
│   ├── Encuesta.js
│   ├── Usuario.js
│   └── Comentario.js
├── routes/              # Rutas API
│   └── index.js
├── __tests__/           # Tests unitarios
│   ├── EncuestaManager.test.js
│   ├── EncuestaController.test.js
│   ├── UsuarioManager.test.js
│   ├── UsuarioController.test.js
│   ├── ComentarioManager.test.js
│   └── ComentarioController.test.js
├── db.js                # Conexión MongoDB
├── index.js             # Servidor Express
├── package.json         # Dependencias
├── render.yaml          # Config para Render
└── README.md           # Este archivo
```

## 🔐 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ CORS habilitado para desarrollo
- ✅ Validación de entrada en frontend y backend
- ✅ Mongoose schema validation
- ✅ Pre-save hooks para encriptación

## 📚 API Endpoints

### Usuarios
- `POST /api/usuarios/registro` - Crear usuario
- `POST /api/usuarios/login` - Iniciar sesión
- `GET /api/usuarios/correo/:correo` - Obtener usuario

### Encuestas
- `POST /api/encuestas` - Crear encuesta
- `GET /api/encuestas` - Obtener todas
- `GET /api/encuestas/:id` - Obtener por ID
- `PUT /api/encuestas/:id` - Editar encuesta
- `DELETE /api/encuestas/:id` - Eliminar encuesta
- `POST /api/encuestas/:id/votar` - Votar en encuesta

### Comentarios
- `POST /api/comentarios` - Crear comentario
- `GET /api/comentarios/:encuestaId` - Obtener comentarios
- `PUT /api/comentarios/:id` - Editar comentario
- `DELETE /api/comentarios/:id` - Eliminar comentario

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Verificar MONGODB_URI en .env
# Asegúrate que MongoDB Atlas permite tu IP
```

### Tests fallando
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm test
```

### Puerto ya en uso
```bash
# Cambiar puerto
PORT=3000 npm start
```

## 📊 Cobertura de Tests

- ✅ EncuestaManager: 12 tests
- ✅ EncuestaController: 11 tests
- ✅ UsuarioManager: 11 tests
- ✅ UsuarioController: 10 tests
- ✅ ComentarioManager: 17 tests
- ✅ ComentarioController: 15 tests

**Total: 76 tests (100% passing)**

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

ISC

## 💬 Soporte

¿Problemas? Revisa:
- [DESPLIEGUE_GUIA.md](./DESPLIEGUE_GUIA.md) - Guía completa
- [DESPLIEGUE_RAPIDO.md](./DESPLIEGUE_RAPIDO.md) - Pasos rápidos
- [CAMBIOS_TRADUCCION.md](./CAMBIOS_TRADUCCION.md) - Cambios realizados
- [RESUMEN_TRADUCCION.md](./RESUMEN_TRADUCCION.md) - Resumen de traducción

---

**Creado con ❤️**

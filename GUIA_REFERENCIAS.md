# 🎯 Guía Rápida de Referencias - Nombres Traducidos

## 📌 Funciones Principales (dashboard.html)

### Gestión de Encuestas
| Función Anterior | Nueva Función | Propósito |
|------------------|---------------|-----------|
| `loadSurveys()` | `cargarEncuestas()` | Cargar todas las encuestas del servidor |
| `toggleSurveyDetails()` | `alternarDetallesEncuesta()` | Mostrar/ocultar detalles de una encuesta |
| `vote()` | `votar()` | Registrar un voto en una opción |

### Comentarios
| Función Anterior | Nueva Función | Propósito |
|------------------|---------------|-----------|
| `toggleComments()` | `alternarComentarios()` | Mostrar/ocultar sección de comentarios |
| `loadComments()` | `cargarComentarios()` | Cargar comentarios de una encuesta |
| `addComment()` | `agregarComentario()` | Añadir nuevo comentario |

### Modal de Edición
| Función Anterior | Nueva Función | Propósito |
|------------------|---------------|-----------|
| `openEditModal()` | `abrirModalEditar()` | Abrir modal para editar encuesta |
| `closeEditModal()` | `cerrarModalEditar()` | Cerrar modal de edición |
| `saveEditSurvey()` | `guardarEncuestaEditada()` | Guardar cambios de la encuesta |
| `deleteSurvey()` | `eliminarEncuesta()` | Eliminar una encuesta |

### Utilidades
| Función Anterior | Nueva Función | Propósito |
|------------------|---------------|-----------|
| `logout()` | `cerrarSesion()` | Cerrar sesión del usuario |
| `escapeHtml()` | `escaparHtml()` | Escapar caracteres especiales HTML |

---

## 🔑 Variables Importantes (dashboard.html)

| Variable Anterior | Nueva Variable | Uso |
|------------------|-----------------|-----|
| `currentEditingId` | `idEncuestaEditando` | ID de la encuesta siendo editada |
| `userVotedOption` | `opcionVotada` | Índice de opción votada por usuario |
| `colorScheme` | `esquemaColor` | Esquema de colores actual |
| `imageUrl` | `urlImagen` | URL de imagen de la encuesta |
| `userEmail` | `emailUsuario` | Email del usuario actual |
| `isCreator` | `esCreador` | Boolean si es creador de encuesta |
| `isVoted` | `esVotado` | Boolean si ya votó en opción |

---

## 🎨 Clases CSS Principales

### Botones
```css
.btnCerrarSesion     /* Botón cerrar sesión */
.btnCrear            /* Botón crear encuesta */
.btnVotar            /* Botones de votación */
.btnComentarios      /* Botón de comentarios */
.btnEditar           /* Botón editar encuesta */
.btnEliminar         /* Botón eliminar encuesta */
.btnGuardar          /* Botón guardar cambios */
.btnCancelar         /* Botón cancelar operación */
```

### Contenedores
```css
.itemEncuesta           /* Contenedor de una encuesta */
.listaEncuestas         /* Contenedor de lista de encuestas */
.detallesEncuesta       /* Detalles desplegables */
.seccionVotacion        /* Sección de opciones para votar */
.seccionComentarios     /* Sección de comentarios */
```

### Estilos de Texto
```css
.tituloEncuesta         /* Título de la encuesta */
.autorEncuesta          /* Autor/creador de la encuesta */
.descripcionEncuesta    /* Descripción de la encuesta */
.comentario             /* Contenedor de un comentario */
.autorComentario        /* Nombre del autor del comentario */
.textoComentario        /* Contenido del comentario */
```

### Formularios
```css
.grupoFormulario        /* Grupo de campos de formulario */
.entradaComentario      /* Campo de entrada de comentario */
.btnEnviarComentario    /* Botón enviar comentario */
```

### Modal
```css
.tituloModal            /* Título del modal */
.btnCerrarModal         /* Botón cerrar modal */
.accionesModal          /* Contenedor de acciones del modal */
```

---

## 📧 Funciones Autenticación

### login.html
```javascript
const URL_API = '/api';                    // URL base de API
function escaparHtml(str) { ... }          // Escapar HTML
async function iniciarSesion() { ... }     // Iniciar sesión
```

### register.html
```javascript
const URL_API = '/api';                    // URL base de API
function escaparHtml(str) { ... }          // Escapar HTML
async function registrar() { ... }         // Registrarse (ya estaba en español)
```

### encuestas.html
```javascript
const URL_API = '/api';                    // URL base de API
function escaparHtml(s) { ... }            // Escapar HTML
async function crear() { ... }             // Crear encuesta (ya estaba en español)
function aplicarSesionAlFormulario() {...} // Validar sesión
```

---

## 🔍 Cómo Buscar Funcionalidades

### Buscar por Acción
| Si quiero... | Busco... |
|-------------|----------|
| Cambiar cómo se cargan encuestas | `cargarEncuestas` |
| Modificar votación | `votar` |
| Cambiar edición de encuestas | `guardarEncuestaEditada` |
| Modificar comentarios | `agregarComentario` o `cargarComentarios` |
| Cambiar cierre de sesión | `cerrarSesion` |

### Buscar por Elemento UI
| Si quiero cambiar... | Busco clase... |
|-------------------|-----------------|
| Un botón específico | `.btn` + nombre (ej: `.btnVotar`) |
| Contenedor de encuesta | `.itemEncuesta` |
| Detalles desplegables | `.detallesEncuesta` |
| Sección de comentarios | `.seccionComentarios` |

---

## 🚀 IDs de Elementos Importantes

### HTML IDs que Cambiaron
```javascript
document.getElementById('listaEncuestas')         // Contenedor de encuestas
document.getElementById('tituloEditar')           // Input título modal
document.getElementById('descripcionEditar')      // Textarea descripción modal
document.getElementById('opcionesEditar')         // Input opciones modal
document.getElementById('editModal')              // El modal de edición
```

### IDs Dinámicos por Encuesta
```javascript
`details-${e._id}`                                // Detalles de encuesta
`comments-${e._id}`                               // Sección comentarios
`lista-comentarios-${e._id}`                      // Lista de comentarios
`nuevo-comentario-${e._id}`                       // Input nuevo comentario
```

---

## 📝 Ejemplos de Uso

### Llamar función cargar encuestas
```javascript
cargarEncuestas();
```

### Llamar función votar
```javascript
votar(encuestaId, indiceOpcion, event);
```

### Llamar función abrir modal
```javascript
abrirModalEditar(encuestaId, event);
```

### Acceder a elemento HTML
```javascript
const container = document.getElementById('listaEncuestas');
```

---

## ✅ Verificación Rápida

Para verificar que todo está traducido correctamente, busca en el código:

**Nombres ANTERIORES (no deben existir):**
```javascript
logout  loadSurveys  toggleSurveyDetails  vote  toggleComments
loadComments  addComment  escapeHtml  openEditModal  closeEditModal
saveEditSurvey  deleteSurvey
```

**Nombres NUEVOS (deben existir):**
```javascript
cerrarSesion  cargarEncuestas  alternarDetallesEncuesta  votar
alternarComentarios  cargarComentarios  agregarComentario
escaparHtml  abrirModalEditar  cerrarModalEditar
guardarEncuestaEditada  eliminarEncuesta
```

---

**Estado:** ✅ COMPLETADO
**Fecha:** 2 de Diciembre de 2025
**Compatibilidad:** 100% con versión anterior (funcionalidad idéntica)

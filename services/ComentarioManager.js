const { ComentarioClass } = require('../models/Comentario');

class ComentarioManager {
  async crearComentario(datos) {
    let { usuario, contenido, encuestaId } = datos;
    if (usuario && typeof usuario === 'object') {
      usuario = usuario.correo || usuario.nombre || '';
    }
    if (!usuario || (typeof usuario === 'string' && !usuario.trim())) {
      throw new Error('El usuario es obligatorio.');
    }
    if (!contenido || (typeof contenido === 'string' && !contenido.trim())) {
      throw new Error('El contenido del comentario no puede estar vacío.');
    }
    if (!encuestaId) {
      throw new Error('El ID de la encuesta es obligatorio.');
    }
    try {
      const comentarioClass = new ComentarioClass({
        usuario: usuario.toString().trim(),
        contenido: contenido.toString().trim(),
        encuestaId: encuestaId
      });

      return await comentarioClass.guardar();
    } catch (error) {
      throw new Error(`Error al crear comentario: ${error.message}`);
    }
  }
  async obtenerPorEncuesta(encuestaId) {
    if (!encuestaId) {
      throw new Error('El ID de la encuesta es obligatorio.');
    }
    try {
      return await ComentarioClass.obtenerPorEncuesta(encuestaId);
    } catch (error) {
      throw new Error(`Error al obtener comentarios: ${error.message}`);
    }
  }

  async actualizar(id, datos) {
    if (!id) {
      throw new Error('El ID es obligatorio.');
    }

    const actualizacion = {};

    if (datos.contenido) {
      if (!datos.contenido.trim()) {
        throw new Error('El contenido del comentario no puede estar vacío.');
      }
      actualizacion.contenido = datos.contenido.trim();
    }

    try {
      const comentarioActualizado = await ComentarioClass.actualizar(id, actualizacion);
      if (!comentarioActualizado) {
        throw new Error('Comentario no encontrado para actualizar.');
      }
      return comentarioActualizado;
    } catch (error) {
      throw new Error(`Error al actualizar comentario: ${error.message}`);
    }
  }

  async eliminar(id) {
    if (!id) {
      throw new Error('El ID es obligatorio.');
    }
    try {
      const resultado = await ComentarioClass.eliminar(id);
      if (!resultado) {
        throw new Error('Comentario no encontrado para eliminar.');
      }
      return resultado;
    } catch (error) {
      throw new Error(`Error al eliminar comentario: ${error.message}`);
    }
  }
}

module.exports = ComentarioManager;

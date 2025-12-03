const ComentarioManager = require('../services/ComentarioManager');

class ComentarioController {
  constructor() {
    this.manager = new ComentarioManager();
  }

  async crearComentario(req, res) {
    try {
      const { encuestaId, usuario, contenido } = req.body;
      
      if (!encuestaId || !usuario || !contenido) {
        return res.status(400).json({
          success: false,
          message: 'Faltan parámetros requeridos: encuestaId, usuario, contenido'
        });
      }

      const resultado = await this.manager.crearComentario(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Comentario creado correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtenerComentarios(req, res) {
    try {
      const { encuestaId } = req.params;
      
      if (!encuestaId) {
        return res.status(400).json({
          success: false,
          message: 'El ID de encuesta es obligatorio.'
        });
      }

      const comentarios = await this.manager.obtenerPorEncuesta(encuestaId);
      
      res.status(200).json({
        success: true,
        message: 'Comentarios obtenidos correctamente.',
        data: comentarios
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async actualizarComentario(req, res) {
    try {
      const { id } = req.params;
      const { contenido } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'El ID es obligatorio.'
        });
      }
      
      if (!contenido) {
        return res.status(400).json({
          success: false,
          message: 'El contenido es obligatorio.'
        });
      }

      const resultado = await this.manager.actualizar(id, req.body);
      
      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: 'Comentario no encontrado.'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Comentario actualizado correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async eliminarComentario(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'El ID es obligatorio.'
        });
      }

      const resultado = await this.manager.eliminar(id);
      
      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: 'Comentario no encontrado.'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Comentario eliminado correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = ComentarioController;

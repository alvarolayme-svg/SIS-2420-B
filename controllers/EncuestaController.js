const EncuestaManager = require('../services/EncuestaManager');

class EncuestaController {
  constructor() {
    this.manager = new EncuestaManager();
  }
  async crearEncuesta(req, res) {
    try {
      const { titulo, descripcion, creador, opciones } = req.body;
      
      if (!titulo || !descripcion || !creador || !opciones) {
        return res.status(400).json({
          success: false,
          message: 'Faltan parámetros requeridos: titulo, descripcion, creador, opciones'
        });
      }

      const resultado = await this.manager.crearEncuesta(req.body);
      res.status(201).json({
        success: true,
        message: 'Encuesta creada correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  async obtenerEncuestas(req, res) {
    try {
      const { usuario } = req.query;
      const encuestas = await this.manager.obtenerTodas();
      if (usuario) {
        const encuestasConVoto = encuestas.map(encuesta => {
          const votosUsuario = encuesta.votosUsuario || {};
          const userVotedOption = votosUsuario[usuario] !== undefined ? votosUsuario[usuario] : null;
          return {
            ...encuesta.toObject(),
            userVotedOption
          };
        });

        res.status(200).json({
          success: true,
          message: 'Encuestas obtenidas correctamente.',
          data: encuestasConVoto
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Encuestas obtenidas correctamente.',
          data: encuestas
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  async obtenerEncuestaPorId(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'El ID es obligatorio.'
        });
      }

      const resultado = await this.manager.obtenerPorId(id);
      
      res.status(200).json({
        success: true,
        message: 'Encuesta obtenida correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async editarEncuesta(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descripcion, opciones } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'El ID es obligatorio.'
        });
      }

      const resultado = await this.manager.editarEncuesta(id, req.body);
      
      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: 'Encuesta no encontrada.'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Encuesta editada correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  async eliminarEncuesta(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'El ID es obligatorio.'
        });
      }
      const resultado = await this.manager.eliminarEncuesta(id);
      if (!resultado) {
        return res.status(404).json({
          success: false,
          message: 'Encuesta no encontrada.'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Encuesta eliminada correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
  async votarEncuesta(req, res) {
    try {
      const { id } = req.params;
      const { opcionIndex, usuarioCorreo } = req.body;

      if (!id || opcionIndex === undefined || !usuarioCorreo) {
        return res.status(400).json({
          success: false,
          message: 'Faltan parámetros requeridos: opcionIndex, usuarioCorreo'
        });
      }

      const resultado = await this.manager.votarEnEncuesta(id, opcionIndex, usuarioCorreo);

      res.status(200).json({
        success: true,
        message: 'Voto registrado correctamente.',
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

module.exports = EncuestaController;

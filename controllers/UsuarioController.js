const UsuarioManager = require('../services/UsuarioManager');

class UsuarioController {
  constructor() {
    this.manager = new UsuarioManager();
  }

  async registro(req, res) {
    try {
      const { correo, contraseña, nombre } = req.body;
      
      if (!correo || !contraseña || !nombre) {
        return res.status(400).json({
          success: false,
          message: 'Faltan parámetros requeridos: correo, contraseña, nombre'
        });
      }

      const resultado = await this.manager.crearUsuario(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { correo, contraseña } = req.body;
      
      if (!correo || !contraseña) {
        return res.status(400).json({
          success: false,
          message: 'El correo y contraseña son obligatorios.'
        });
      }
      const resultado = await this.manager.autenticar({ correo, contraseña });
      res.status(200).json({
        success: true,
        message: 'Usuario autenticado correctamente.',
        data: resultado
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message
      });
    }
  }

  async obtenerPorCorreo(req, res) {
    try {
      const { correo } = req.params;
      
      if (!correo) {
        return res.status(400).json({
          success: false,
          message: 'El correo es obligatorio.'
        });
      }

      const usuario = await this.manager.obtenerPorCorreo(correo);
      
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado.'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Usuario obtenido correctamente.',
        data: usuario
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = UsuarioController;

const { UsuarioClass } = require('../models/Usuario');

class UsuarioManager {
  async crearUsuario(datos) {
    const { nombre, correo, contraseña, password } = datos;
    const pwd = contraseña || password;
    if (!nombre || !nombre.trim()) {
      throw new Error('El nombre es obligatorio.');
    }
    if (nombre.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres.');
    }
    if (!correo || !correo.trim()) {
      throw new Error('El correo es obligatorio.');
    }

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo.trim())) {
      throw new Error('Formato de correo inválido.');
    }

    if (!pwd || !pwd.trim()) {
      throw new Error('La contraseña es obligatoria.');
    }
    if (pwd.length < 4) {
      throw new Error('La contraseña debe tener al menos 4 caracteres.');
    }

    try {
      const usuarioExistente = await UsuarioClass.encontrarPorCorreo(correo.trim());
      if (usuarioExistente) {
        throw new Error('El correo ya está registrado.');
      }

      const usuarioClass = new UsuarioClass({
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        Password: pwd.trim()
      });

      return await usuarioClass.guardar();
    } catch (error) {
      throw new Error(error.message || `Error al crear usuario: ${error}`);
    }
  }
  async autenticar(datos) {
    let correo, password;
    if (typeof datos === 'string') {
      correo = datos;
      password = arguments[1];
    } else {
      correo = datos.correo;
      password = datos.contraseña || datos.password;
    }
    
    if (!correo || !correo.trim()) {
      throw new Error('El correo es obligatorio.');
    }
    if (!password) {
      throw new Error('La contraseña es obligatoria.');
    }

    try {
      const usuario = await UsuarioClass.encontrarPorCorreo(correo.trim());
      
      if (!usuario) {
        throw new Error('Usuario no encontrado.');
      }

      const valido = await usuario.validarPassword(password);
      if (!valido) {
        throw new Error('Contraseña incorrecta.');
      }

      return usuario;
    } catch (error) {
      throw new Error(error.message || `Error al autenticar: ${error}`);
    }
  }
  async obtenerPorCorreo(correo) {
    if (!correo) {
      throw new Error('El correo es obligatorio.');
    }
    try {
      return await UsuarioClass.encontrarPorCorreo(correo);
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }
}

module.exports = UsuarioManager;

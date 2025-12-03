const UsuarioManager = require('../services/UsuarioManager');
const { UsuarioClass } = require('../models/Usuario');

jest.mock('../models/Usuario');

describe('UsuarioManager', () => {
  let usuarioManager;

  beforeEach(() => {
    usuarioManager = new UsuarioManager();
    jest.clearAllMocks();
  });

  describe('crearUsuario', () => {
    it('debe crear un usuario correctamente', async () => {
      const datos = {
        correo: 'test@example.com',
        password: 'password123',
        nombre: 'Test User'
      };

      UsuarioClass.encontrarPorCorreo = jest.fn().mockResolvedValue(null);
      UsuarioClass.prototype.guardar = jest.fn().mockResolvedValue({
        _id: '123',
        correo: datos.correo,
        nombre: datos.nombre
      });

      const resultado = await usuarioManager.crearUsuario(datos);

      expect(resultado).toBeDefined();
      expect(resultado.correo).toBe(datos.correo);
    });

    it('debe rechazar si el correo ya existe', async () => {
      const datos = {
        correo: 'existing@example.com',
        password: 'password123',
        nombre: 'Test User'
      };

      UsuarioClass.encontrarPorCorreo = jest.fn().mockResolvedValue({ correo: datos.correo });

      await expect(usuarioManager.crearUsuario(datos))
        .rejects
        .toThrow('El correo ya está registrado.');
    });

    it('debe rechazar si el correo no es válido', async () => {
      const datos = {
        correo: 'invalid-email',
        password: 'password123',
        nombre: 'Test User'
      };

      await expect(usuarioManager.crearUsuario(datos))
        .rejects
        .toThrow('Formato de correo inválido.');
    });

    it('debe rechazar si la contraseña es menor a 4 caracteres', async () => {
      const datos = {
        correo: 'test@example.com',
        password: 'abc',
        nombre: 'Test User'
      };

      await expect(usuarioManager.crearUsuario(datos))
        .rejects
        .toThrow('La contraseña debe tener al menos 4 caracteres.');
    });

    it('debe rechazar si el nombre no tiene al menos 2 caracteres', async () => {
      const datos = {
        correo: 'test@example.com',
        password: 'password123',
        nombre: 'T'
      };

      await expect(usuarioManager.crearUsuario(datos))
        .rejects
        .toThrow('El nombre debe tener al menos 2 caracteres.');
    });
  });

  describe('obtenerPorCorreo', () => {
    it('debe obtener un usuario por correo', async () => {
      const usuarioMock = {
        _id: '123',
        correo: 'test@example.com',
        nombre: 'Test User'
      };

      UsuarioClass.encontrarPorCorreo = jest.fn().mockResolvedValue(usuarioMock);

      const resultado = await usuarioManager.obtenerPorCorreo('test@example.com');

      expect(resultado).toEqual(usuarioMock);
      expect(UsuarioClass.encontrarPorCorreo).toHaveBeenCalledWith('test@example.com');
    });

    it('debe retornar null si el usuario no existe', async () => {
      UsuarioClass.encontrarPorCorreo = jest.fn().mockResolvedValue(null);

      const resultado = await usuarioManager.obtenerPorCorreo('noexiste@example.com');

      expect(resultado).toBeNull();
    });
  });

  describe('autenticar', () => {
    it('debe autenticar un usuario correctamente', async () => {
      const usuarioMock = {
        _id: '123',
        correo: 'test@example.com',
        nombre: 'Test User',
        validarPassword: jest.fn().mockResolvedValue(true)
      };

      UsuarioClass.encontrarPorCorreo = jest.fn().mockResolvedValue(usuarioMock);

      const resultado = await usuarioManager.autenticar('test@example.com', 'password123');

      expect(resultado).toEqual(usuarioMock);
    });

    it('debe rechazar si el usuario no existe', async () => {
      UsuarioClass.encontrarPorCorreo = jest.fn().mockResolvedValue(null);

      await expect(usuarioManager.autenticar('noexiste@example.com', 'password123'))
        .rejects
        .toThrow();
    });

    it('debe rechazar si la contraseña es incorrecta', async () => {
      const usuarioMock = {
        _id: '123',
        correo: 'test@example.com',
        nombre: 'Test User',
        validarPassword: jest.fn().mockResolvedValue(false)
      };

      UsuarioClass.encontrarPorCorreo = jest.fn().mockResolvedValue(usuarioMock);

      await expect(usuarioManager.autenticar('test@example.com', 'passwordIncorrecto'))
        .rejects
        .toThrow();
    });
  });
});

const UsuarioController = require('../controllers/UsuarioController');
const UsuarioManager = require('../services/UsuarioManager');

jest.mock('../services/UsuarioManager');

describe('UsuarioController', () => {
  let usuarioController;
  let mockManager;
  let req, res;

  beforeEach(() => {
    mockManager = {
      crearUsuario: jest.fn(),
      obtenerPorCorreo: jest.fn(),
      autenticar: jest.fn()
    };

    UsuarioManager.mockImplementation(() => mockManager);
    usuarioController = new UsuarioController();

    req = {
      body: {},
      params: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('registro', () => {
    it('debe registrar un usuario correctamente', async () => {
      req.body = {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        contraseña: 'Password123'
      };

      mockManager.crearUsuario.mockResolvedValue({
        _id: 'user123',
        nombre: req.body.nombre,
        correo: req.body.correo
      });

      await usuarioController.registro(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Usuario creado correctamente.'
        })
      );
    });

    it('debe retornar error 400 si faltan parámetros', async () => {
      req.body = {
        nombre: 'Juan'
      };

      await usuarioController.registro(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Faltan parámetros requeridos: correo, contraseña, nombre'
        })
      );
    });

    it('debe retornar error 500 si hay error en el servidor', async () => {
      req.body = {
        nombre: 'Juan',
        correo: 'juan@example.com',
        contraseña: 'Password123'
      };

      mockManager.crearUsuario.mockRejectedValue(
        new Error('El correo ya está registrado.')
      );

      await usuarioController.registro(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('login', () => {
    it('debe iniciar sesión correctamente', async () => {
      req.body = {
        correo: 'juan@example.com',
        contraseña: 'Password123'
      };

      const usuarioMock = {
        _id: 'user123',
        nombre: 'Juan Pérez',
        correo: 'juan@example.com'
      };

      mockManager.autenticar.mockResolvedValue(usuarioMock);

      await usuarioController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Usuario autenticado correctamente.',
          data: usuarioMock
        })
      );
    });

    it('debe retornar error 400 si faltan parámetros', async () => {
      req.body = {
        correo: 'juan@example.com'
      };

      await usuarioController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El correo y contraseña son obligatorios.'
        })
      );
    });

    it('debe retornar error 401 si hay error de autenticación', async () => {
      req.body = {
        correo: 'juan@example.com',
        contraseña: 'PasswordIncorrecto'
      };

      mockManager.autenticar.mockRejectedValue(
        new Error('Contraseña incorrecta.')
      );

      await usuarioController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Contraseña incorrecta.'
        })
      );
    });
  });

  describe('obtenerPorCorreo', () => {
    it('debe obtener un usuario por correo', async () => {
      req.params.correo = 'juan@example.com';

      const usuarioMock = {
        _id: 'user123',
        nombre: 'Juan Pérez',
        correo: 'juan@example.com'
      };

      mockManager.obtenerPorCorreo.mockResolvedValue(usuarioMock);

      await usuarioController.obtenerPorCorreo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Usuario obtenido correctamente.',
          data: usuarioMock
        })
      );
    });

    it('debe retornar error 400 si no hay correo', async () => {
      req.params.correo = '';

      await usuarioController.obtenerPorCorreo(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El correo es obligatorio.'
        })
      );
    });

    it('debe retornar error 404 si el usuario no existe', async () => {
      req.params.correo = 'noexiste@example.com';

      mockManager.obtenerPorCorreo.mockResolvedValue(null);

      await usuarioController.obtenerPorCorreo(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Usuario no encontrado.'
        })
      );
    });

    it('debe retornar error 500 si hay error en el servidor', async () => {
      req.params.correo = 'juan@example.com';

      mockManager.obtenerPorCorreo.mockRejectedValue(
        new Error('Error en base de datos')
      );

      await usuarioController.obtenerPorCorreo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error en base de datos'
        })
      );
    });
  });
});

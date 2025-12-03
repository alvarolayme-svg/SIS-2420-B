const EncuestaController = require('../controllers/EncuestaController');
const EncuestaManager = require('../services/EncuestaManager');

jest.mock('../services/EncuestaManager');

describe('EncuestaController', () => {
  let encuestaController;
  let mockManager;
  let req, res;

  beforeEach(() => {
    mockManager = {
      crearEncuesta: jest.fn(),
      obtenerTodas: jest.fn(),
      obtenerPorId: jest.fn(),
      editarEncuesta: jest.fn(),
      eliminarEncuesta: jest.fn(),
      votarEnEncuesta: jest.fn()
    };

    EncuestaManager.mockImplementation(() => mockManager);
    encuestaController = new EncuestaController();

    req = {
      body: {},
      params: {},
      query: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('crearEncuesta', () => {
    it('debe crear una encuesta correctamente', async () => {
      req.body = {
        titulo: 'Mi Encuesta',
        descripcion: 'Descripción',
        creador: 'usuario',
        opciones: ['Op1', 'Op2']
      };

      mockManager.crearEncuesta.mockResolvedValue({
        _id: '123',
        ...req.body
      });

      await encuestaController.crearEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Encuesta creada correctamente.'
        })
      );
    });

    it('debe retornar error 400 si faltan parámetros', async () => {
      req.body = {
        titulo: 'Mi Encuesta'
        // Faltan otros parámetros
      };

      await encuestaController.crearEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Faltan parámetros requeridos: titulo, descripcion, creador, opciones'
        })
      );
    });

    it('debe retornar error 500 si hay error en el servidor', async () => {
      req.body = {
        titulo: 'Mi Encuesta',
        descripcion: 'Descripción',
        creador: 'usuario',
        opciones: ['Op1']
      };

      mockManager.crearEncuesta.mockRejectedValue(
        new Error('Error al crear encuesta')
      );

      await encuestaController.crearEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error al crear encuesta'
        })
      );
    });
  });

  describe('obtenerEncuestas', () => {
    it('debe obtener todas las encuestas', async () => {
      const encuestasMock = [
        { _id: '1', titulo: 'Encuesta 1', toObject: () => ({ _id: '1', titulo: 'Encuesta 1' }) },
        { _id: '2', titulo: 'Encuesta 2', toObject: () => ({ _id: '2', titulo: 'Encuesta 2' }) }
      ];

      mockManager.obtenerTodas.mockResolvedValue(encuestasMock);

      await encuestaController.obtenerEncuestas(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Encuestas obtenidas correctamente.'
        })
      );
    });

    it('debe retornar error 500 si hay error en el servidor', async () => {
      mockManager.obtenerTodas.mockRejectedValue(
        new Error('Error en base de datos')
      );

      await encuestaController.obtenerEncuestas(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error en base de datos'
        })
      );
    });
  });

  describe('votarEncuesta', () => {
    it('debe registrar un voto correctamente', async () => {
      req.params.id = '123';
      req.body = {
        opcionIndex: 0,
        usuarioCorreo: 'usuario@example.com'
      };

      mockManager.votarEnEncuesta.mockResolvedValue({
        _id: '123',
        opciones: [{ texto: 'Op1', votos: 1 }]
      });

      await encuestaController.votarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Voto registrado correctamente.'
        })
      );
    });

    it('debe retornar error 400 si faltan parámetros', async () => {
      req.params.id = '123';
      req.body = {
        opcionIndex: 0
        // Falta usuarioCorreo
      };

      await encuestaController.votarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Faltan parámetros requeridos: opcionIndex, usuarioCorreo'
        })
      );
    });

    it('debe retornar error 500 si hay error en el servidor', async () => {
      req.params.id = '123';
      req.body = {
        opcionIndex: 0,
        usuarioCorreo: 'usuario@example.com'
      };

      mockManager.votarEnEncuesta.mockRejectedValue(
        new Error('Error al votar')
      );

      await encuestaController.votarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error al votar'
        })
      );
    });
  });

  describe('editarEncuesta', () => {
    it('debe editar una encuesta correctamente', async () => {
      req.params.id = '123';
      req.body = {
        titulo: 'Nuevo título',
        descripcion: 'Nueva descripción',
        opciones: ['Op1', 'Op2']
      };

      mockManager.editarEncuesta.mockResolvedValue({
        _id: '123',
        ...req.body
      });

      await encuestaController.editarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Encuesta editada correctamente.'
        })
      );
    });

    it('debe retornar error 400 si falta el ID', async () => {
      req.params.id = '';
      req.body = {
        titulo: 'Nuevo título',
        descripcion: 'Nueva descripción',
        opciones: ['Op1']
      };

      await encuestaController.editarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El ID es obligatorio.'
        })
      );
    });

    it('debe retornar error 404 si la encuesta no existe', async () => {
      req.params.id = '999';
      req.body = {
        titulo: 'Nuevo título',
        descripcion: 'Nueva descripción',
        opciones: ['Op1']
      };

      mockManager.editarEncuesta.mockResolvedValue(null);

      await encuestaController.editarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Encuesta no encontrada.'
        })
      );
    });
  });

  describe('eliminarEncuesta', () => {
    it('debe eliminar una encuesta correctamente', async () => {
      req.params.id = '123';

      mockManager.eliminarEncuesta.mockResolvedValue({ _id: '123' });

      await encuestaController.eliminarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Encuesta eliminada correctamente.'
        })
      );
    });

    it('debe retornar error 400 si falta el ID', async () => {
      req.params.id = '';

      await encuestaController.eliminarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El ID es obligatorio.'
        })
      );
    });

    it('debe retornar error 404 si la encuesta no existe', async () => {
      req.params.id = '999';

      mockManager.eliminarEncuesta.mockResolvedValue(null);

      await encuestaController.eliminarEncuesta(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Encuesta no encontrada.'
        })
      );
    });
  });
});

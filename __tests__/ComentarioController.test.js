const ComentarioController = require('../controllers/ComentarioController');
const ComentarioManager = require('../services/ComentarioManager');

jest.mock('../services/ComentarioManager');

describe('ComentarioController', () => {
  let comentarioController;
  let mockManager;
  let req, res;

  beforeEach(() => {
    mockManager = {
      crearComentario: jest.fn(),
      obtenerPorEncuesta: jest.fn(),
      actualizar: jest.fn(),
      eliminar: jest.fn()
    };

    ComentarioManager.mockImplementation(() => mockManager);
    comentarioController = new ComentarioController();

    // Mock de req y res
    req = {
      body: {},
      params: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      statusCode: null
    };
  });

  describe('crearComentario', () => {
    it('debe crear un comentario correctamente', async () => {
      req.body = {
        usuario: 'usuario@example.com',
        contenido: 'Excelente encuesta',
        encuestaId: '123'
      };

      mockManager.crearComentario.mockResolvedValue({
        _id: 'com123',
        ...req.body
      });

      await comentarioController.crearComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Comentario creado correctamente.'
        })
      );
    });

    it('debe retornar error 400 si faltan parámetros', async () => {
      req.body = {
        usuario: 'usuario@example.com',
        // Falta contenido y encuestaId
      };

      await comentarioController.crearComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Faltan parámetros requeridos: encuestaId, usuario, contenido'
        })
      );
    });

    it('debe retornar error 500 si hay error en el manager', async () => {
      req.body = {
        usuario: 'usuario@example.com',
        contenido: 'Comentario',
        encuestaId: '123'
      };

      mockManager.crearComentario.mockRejectedValue(
        new Error('Error en base de datos')
      );

      await comentarioController.crearComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error en base de datos'
        })
      );
    });
  });

  describe('obtenerComentarios', () => {
    it('debe obtener comentarios de una encuesta', async () => {
      req.params.encuestaId = '123';

      const comentariosMock = [
        { _id: '1', usuario: 'user1@example.com', contenido: 'Comentario 1' },
        { _id: '2', usuario: 'user2@example.com', contenido: 'Comentario 2' }
      ];

      mockManager.obtenerPorEncuesta.mockResolvedValue(comentariosMock);

      await comentarioController.obtenerComentarios(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Comentarios obtenidos correctamente.',
          data: comentariosMock
        })
      );
    });

    it('debe retornar error 400 si no hay encuestaId', async () => {
      req.params.encuestaId = '';

      await comentarioController.obtenerComentarios(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El ID de encuesta es obligatorio.'
        })
      );
    });

    it('debe retornar array vacío si no hay comentarios', async () => {
      req.params.encuestaId = '123';

      mockManager.obtenerPorEncuesta.mockResolvedValue([]);

      await comentarioController.obtenerComentarios(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: []
        })
      );
    });

    it('debe retornar error 500 si hay error en el manager', async () => {
      req.params.encuestaId = '123';

      mockManager.obtenerPorEncuesta.mockRejectedValue(
        new Error('Error al consultar BD')
      );

      await comentarioController.obtenerComentarios(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Error al consultar BD'
        })
      );
    });
  });

  describe('actualizarComentario', () => {
    it('debe actualizar un comentario correctamente', async () => {
      req.params.id = 'com123';
      req.body = {
        contenido: 'Comentario actualizado'
      };

      mockManager.actualizar.mockResolvedValue({
        _id: 'com123',
        usuario: 'usuario@example.com',
        contenido: 'Comentario actualizado'
      });

      await comentarioController.actualizarComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Comentario actualizado correctamente.'
        })
      );
    });

    it('debe retornar error 400 si no hay ID', async () => {
      req.params.id = '';
      req.body = { contenido: 'test' };

      await comentarioController.actualizarComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El ID es obligatorio.'
        })
      );
    });

    it('debe retornar error 400 si no hay contenido', async () => {
      req.params.id = 'com123';
      req.body = {}; // Sin contenido

      await comentarioController.actualizarComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El contenido es obligatorio.'
        })
      );
    });

    it('debe retornar error 404 si el comentario no existe', async () => {
      req.params.id = 'com999';
      req.body = { contenido: 'nuevo' };

      mockManager.actualizar.mockResolvedValue(null);

      await comentarioController.actualizarComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Comentario no encontrado.'
        })
      );
    });
  });

  describe('eliminarComentario', () => {
    it('debe eliminar un comentario correctamente', async () => {
      req.params.id = 'com123';

      mockManager.eliminar.mockResolvedValue({ _id: 'com123' });

      await comentarioController.eliminarComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Comentario eliminado correctamente.'
        })
      );
    });

    it('debe retornar error 400 si no hay ID', async () => {
      req.params.id = '';

      await comentarioController.eliminarComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'El ID es obligatorio.'
        })
      );
    });

    it('debe retornar error 404 si el comentario no existe', async () => {
      req.params.id = 'com999';

      mockManager.eliminar.mockResolvedValue(null);

      await comentarioController.eliminarComentario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Comentario no encontrado.'
        })
      );
    });

    it('debe retornar error 500 si hay error en el manager', async () => {
      req.params.id = 'com123';

      mockManager.eliminar.mockRejectedValue(
        new Error('Error en base de datos')
      );

      await comentarioController.eliminarComentario(req, res);

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

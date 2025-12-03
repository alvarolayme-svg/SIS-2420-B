const ComentarioManager = require('../services/ComentarioManager');
const { ComentarioClass } = require('../models/Comentario');

jest.mock('../models/Comentario');

describe('ComentarioManager', () => {
  let comentarioManager;

  beforeEach(() => {
    comentarioManager = new ComentarioManager();
    jest.clearAllMocks();
  });

  describe('crearComentario', () => {
    it('debe crear un comentario correctamente', async () => {
      const datos = {
        usuario: 'usuario@example.com',
        contenido: 'Este es mi comentario',
        encuestaId: '123'
      };

      ComentarioClass.prototype.guardar = jest.fn().mockResolvedValue({
        _id: 'com123',
        ...datos
      });

      const resultado = await comentarioManager.crearComentario(datos);

      expect(resultado).toBeDefined();
      expect(resultado.usuario).toBe(datos.usuario);
      expect(resultado.contenido).toBe(datos.contenido);
    });

    it('debe rechazar si no hay usuario', async () => {
      const datos = {
        usuario: '',
        contenido: 'Comentario',
        encuestaId: '123'
      };

      await expect(comentarioManager.crearComentario(datos))
        .rejects
        .toThrow('El usuario es obligatorio.');
    });

    it('debe rechazar si no hay contenido', async () => {
      const datos = {
        usuario: 'usuario@example.com',
        contenido: '',
        encuestaId: '123'
      };

      await expect(comentarioManager.crearComentario(datos))
        .rejects
        .toThrow('El contenido del comentario no puede estar vacío.');
    });

    it('debe rechazar si no hay encuestaId', async () => {
      const datos = {
        usuario: 'usuario@example.com',
        contenido: 'Comentario',
        encuestaId: null
      };

      await expect(comentarioManager.crearComentario(datos))
        .rejects
        .toThrow('El ID de la encuesta es obligatorio.');
    });

    it('debe rechazar si el contenido es solo espacios', async () => {
      const datos = {
        usuario: 'usuario@example.com',
        contenido: '   ',
        encuestaId: '123'
      };

      await expect(comentarioManager.crearComentario(datos))
        .rejects
        .toThrow('El contenido del comentario no puede estar vacío.');
    });
  });

  describe('obtenerPorEncuesta', () => {
    it('debe obtener comentarios por encuesta', async () => {
      const comentariosMock = [
        { _id: '1', usuario: 'user1@example.com', contenido: 'Comentario 1' },
        { _id: '2', usuario: 'user2@example.com', contenido: 'Comentario 2' }
      ];

      ComentarioClass.obtenerPorEncuesta = jest.fn().mockResolvedValue(comentariosMock);

      const resultado = await comentarioManager.obtenerPorEncuesta('123');

      expect(resultado).toEqual(comentariosMock);
      expect(resultado).toHaveLength(2);
      expect(ComentarioClass.obtenerPorEncuesta).toHaveBeenCalledWith('123');
    });

    it('debe retornar array vacío si no hay comentarios', async () => {
      ComentarioClass.obtenerPorEncuesta = jest.fn().mockResolvedValue([]);

      const resultado = await comentarioManager.obtenerPorEncuesta('123');

      expect(resultado).toEqual([]);
      expect(resultado).toHaveLength(0);
    });

    it('debe rechazar si no hay encuestaId', async () => {
      await expect(comentarioManager.obtenerPorEncuesta(null))
        .rejects
        .toThrow('El ID de la encuesta es obligatorio.');
    });

    it('debe rechazar si encuestaId está vacío', async () => {
      await expect(comentarioManager.obtenerPorEncuesta(''))
        .rejects
        .toThrow('El ID de la encuesta es obligatorio.');
    });
  });

  describe('actualizar', () => {
    it('debe actualizar un comentario correctamente', async () => {
      const datosActualizados = {
        contenido: 'Contenido actualizado'
      };

      ComentarioClass.actualizar = jest.fn().mockResolvedValue({
        _id: 'com123',
        usuario: 'usuario@example.com',
        contenido: 'Contenido actualizado'
      });

      const resultado = await comentarioManager.actualizar('com123', datosActualizados);

      expect(resultado).toBeDefined();
      expect(resultado.contenido).toBe('Contenido actualizado');
      expect(ComentarioClass.actualizar).toHaveBeenCalledWith('com123', {
        contenido: 'Contenido actualizado'
      });
    });

    it('debe rechazar si no hay ID', async () => {
      await expect(comentarioManager.actualizar(null, { contenido: 'test' }))
        .rejects
        .toThrow('El ID es obligatorio.');
    });

    it('debe rechazar si el contenido está vacío', async () => {
      const datosActualizados = { contenido: '   ' };

      await expect(comentarioManager.actualizar('com123', datosActualizados))
        .rejects
        .toThrow('El contenido del comentario no puede estar vacío.');
    });

    it('debe rechazar si no se encuentra el comentario', async () => {
      ComentarioClass.actualizar = jest.fn().mockResolvedValue(null);

      await expect(comentarioManager.actualizar('com999', { contenido: 'nuevo' }))
        .rejects
        .toThrow('Comentario no encontrado para actualizar.');
    });

    it('debe permitir actualizar solo contenido sin cambiar otros campos', async () => {
      const datosActualizados = { contenido: 'Nuevo contenido' };

      ComentarioClass.actualizar = jest.fn().mockResolvedValue({
        _id: 'com123',
        usuario: 'usuario@example.com',
        contenido: 'Nuevo contenido',
        encuestaId: '123'
      });

      const resultado = await comentarioManager.actualizar('com123', datosActualizados);

      expect(resultado.usuario).toBe('usuario@example.com');
      expect(resultado.encuestaId).toBe('123');
      expect(resultado.contenido).toBe('Nuevo contenido');
    });
  });

  describe('eliminar', () => {
    it('debe eliminar un comentario correctamente', async () => {
      ComentarioClass.eliminar = jest.fn().mockResolvedValue({ _id: 'com123' });

      const resultado = await comentarioManager.eliminar('com123');

      expect(resultado).toBeDefined();
      expect(resultado._id).toBe('com123');
      expect(ComentarioClass.eliminar).toHaveBeenCalledWith('com123');
    });

    it('debe rechazar si no hay ID', async () => {
      await expect(comentarioManager.eliminar(null))
        .rejects
        .toThrow('El ID es obligatorio.');
    });

    it('debe rechazar si no se encuentra el comentario', async () => {
      ComentarioClass.eliminar = jest.fn().mockResolvedValue(null);

      await expect(comentarioManager.eliminar('com999'))
        .rejects
        .toThrow('Comentario no encontrado para eliminar.');
    });
  });
});

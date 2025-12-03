const EncuestaManager = require('../services/EncuestaManager');
const { EncuestaClass } = require('../models/Encuesta');

jest.mock('../models/Encuesta');

describe('EncuestaManager', () => {
  let encuestaManager;

  beforeEach(() => {
    encuestaManager = new EncuestaManager();
    jest.clearAllMocks();
  });

  describe('crearEncuesta', () => {
    it('debe crear una encuesta correctamente', async () => {
      const datos = {
        titulo: 'Mi Encuesta',
        descripcion: 'Una descripción',
        creador: 'usuario@example.com',
        opciones: ['Opción 1', 'Opción 2']
      };

      EncuestaClass.prototype.guardar = jest.fn().mockResolvedValue({
        _id: '123',
        ...datos
      });

      const resultado = await encuestaManager.crearEncuesta(datos);

      expect(resultado).toBeDefined();
      expect(resultado.titulo).toBe(datos.titulo);
    });

    it('debe rechazar si no hay título', async () => {
      const datos = {
        titulo: '',
        descripcion: 'Una descripción',
        creador: 'usuario@example.com',
        opciones: ['Opción 1']
      };

      await expect(encuestaManager.crearEncuesta(datos))
        .rejects
        .toThrow('El título es obligatorio.');
    });

    it('debe rechazar si no hay opciones', async () => {
      const datos = {
        titulo: 'Mi Encuesta',
        descripcion: 'Una descripción',
        creador: 'usuario@example.com',
        opciones: []
      };

      await expect(encuestaManager.crearEncuesta(datos))
        .rejects
        .toThrow('Debes ingresar al menos una opción.');
    });
  });

  describe('obtenerTodas', () => {
    it('debe obtener todas las encuestas', async () => {
      const encuestasMock = [
        { _id: '1', titulo: 'Encuesta 1' },
        { _id: '2', titulo: 'Encuesta 2' }
      ];

      EncuestaClass.obtenerTodas = jest.fn().mockResolvedValue(encuestasMock);

      const resultado = await encuestaManager.obtenerTodas();

      expect(resultado).toEqual(encuestasMock);
      expect(EncuestaClass.obtenerTodas).toHaveBeenCalled();
    });

    it('debe retornar error si hay fallo en BD', async () => {
      EncuestaClass.obtenerTodas = jest.fn().mockRejectedValue(
        new Error('Error en base de datos')
      );

      await expect(encuestaManager.obtenerTodas())
        .rejects
        .toThrow();
    });
  });

  describe('obtenerPorId', () => {
    it('debe obtener una encuesta por ID', async () => {
      const encuestaMock = { _id: '123', titulo: 'Encuesta 1' };

      EncuestaClass.obtenerPorId = jest.fn().mockResolvedValue(encuestaMock);

      const resultado = await encuestaManager.obtenerPorId('123');

      expect(resultado).toEqual(encuestaMock);
    });
  });

  describe('editarEncuesta', () => {
    it('debe editar una encuesta correctamente', async () => {
      const datos = {
        titulo: 'Nuevo título',
        descripcion: 'Nueva descripción',
        opciones: ['Op1', 'Op2']
      };

      EncuestaClass.actualizar = jest.fn().mockResolvedValue({
        _id: '123',
        ...datos
      });

      const resultado = await encuestaManager.editarEncuesta('123', datos);

      expect(resultado).toBeDefined();
    });
  });

  describe('eliminarEncuesta', () => {
    it('debe eliminar una encuesta', async () => {
      EncuestaClass.eliminar = jest.fn().mockResolvedValue({ _id: '123' });

      const resultado = await encuestaManager.eliminarEncuesta('123');

      expect(resultado).toBeDefined();
      expect(EncuestaClass.eliminar).toHaveBeenCalledWith('123');
    });
  });

  describe('votarEnEncuesta', () => {
    it('debe registrar un voto correctamente', async () => {
      const encuestaMock = {
        _id: '123',
        opciones: [
          { texto: 'Opción 1', votos: 0, votantes: [] },
          { texto: 'Opción 2', votos: 0, votantes: [] }
        ],
        save: jest.fn().mockResolvedValue({
          _id: '123',
          opciones: [
            { texto: 'Opción 1', votos: 1, votantes: ['usuario@example.com'] },
            { texto: 'Opción 2', votos: 0, votantes: [] }
          ]
        })
      };

      EncuestaClass.obtenerPorId = jest.fn().mockResolvedValue(encuestaMock);

      const resultado = await encuestaManager.votarEnEncuesta('123', 0, 'usuario@example.com');

      expect(resultado).toBeDefined();
    });

    it('debe permitir cambiar el voto', async () => {
      const encuestaMock = {
        _id: '123',
        opciones: [
          { texto: 'Opción 1', votos: 1 },
          { texto: 'Opción 2', votos: 0 }
        ],
        votantes: ['usuario@example.com'],
        votosUsuario: { 'usuario@example.com': 0 }
      };

      EncuestaClass.obtenerPorId = jest.fn().mockResolvedValue(encuestaMock);

      const resultado = await encuestaManager.votarEnEncuesta('123', 1, 'usuario@example.com');

      expect(resultado).toBeDefined();
    });
  });
});

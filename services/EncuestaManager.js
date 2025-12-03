const { EncuestaClass } = require('../models/Encuesta');

class EncuestaManager {
  async crearEncuesta(datos) {
    const { titulo, descripcion, creador, opciones } = datos;
    if (!titulo || !titulo.trim()) {
      throw new Error('El título es obligatorio.');
    }
    if (!descripcion || !descripcion.trim()) {
      throw new Error('La descripción es obligatoria.');
    }
    if (!creador || !creador.trim()) {
      throw new Error('El creador es obligatorio.');
    }
    if (!opciones || opciones.length === 0) {
      throw new Error('Debes ingresar al menos una opción.');
    }

    try {
      const encuestaClass = new EncuestaClass({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        creador: creador.trim(),
        opciones: opciones.map(op => {
          const textoRaw = typeof op === 'string' ? op : (op && op.texto) ? op.texto : '';
          const texto = textoRaw ? textoRaw.toString().trim() : '';
          return { texto, votos: 0 };
        })
      });

      return await encuestaClass.guardar();
    } catch (error) {
      throw new Error(`Error al crear encuesta: ${error.message}`);
    }
  }

  async obtenerTodas() {
    try {
      return await EncuestaClass.obtenerTodas();
    } catch (error) {
      throw new Error(`Error al obtener encuestas: ${error.message}`);
    }
  }

  async obtenerPorId(id) {
    if (!id) {
      throw new Error('El ID es obligatorio.');
    }
    try {
      const encuesta = await EncuestaClass.obtenerPorId(id);
      if (!encuesta) {
        throw new Error('Encuesta no encontrada.');
      }
      return encuesta;
    } catch (error) {
      throw new Error(`Error al obtener encuesta: ${error.message}`);
    }
  }

  async editarEncuesta(id, datos) {
    const { titulo, descripcion, opciones } = datos;
    if (!titulo || !titulo.trim()) {
      throw new Error('El título es obligatorio.');
    }
    if (!descripcion || !descripcion.trim()) {
      throw new Error('La descripción es obligatoria.');
    }
    if (!opciones || opciones.length === 0) {
      throw new Error('Debes ingresar al menos una opción.');
    }

    try {
      const encuestaActual = await EncuestaClass.obtenerPorId(id);
      if (!encuestaActual) {
        throw new Error('Encuesta no encontrada.');
      }

      const opcionesActualizadas = opciones.map(op => {
        const textoRaw = typeof op === 'string' ? op : (op && op.texto) ? op.texto : '';
        const texto = textoRaw ? textoRaw.toString().trim() : '';
        return { texto, votos: op && op.votos !== undefined ? op.votos : 0 };
      });

      const encuestaActualizada = await EncuestaClass.actualizar(id, {
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        opciones: opcionesActualizadas,
        votosUsuario: encuestaActual.votosUsuario || {},
        votantes: encuestaActual.votantes || []
      });

      if (!encuestaActualizada) {
        throw new Error('Encuesta no encontrada para actualizar.');
      }
      return encuestaActualizada;
    } catch (error) {
      throw new Error(`Error al editar encuesta: ${error.message}`);
    }
  }

  async eliminarEncuesta(id) {
    if (!id) {
      throw new Error('El ID es obligatorio.');
    }
    try {
      const resultado = await EncuestaClass.eliminar(id);
      if (!resultado) {
        throw new Error('Encuesta no encontrada para eliminar.');
      }
      return resultado;
    } catch (error) {
      throw new Error(`Error al eliminar encuesta: ${error.message}`);
    }
  }

  async votarEnEncuesta(encuestaId, opcionIndex, usuarioCorreo) {
    if (!encuestaId || opcionIndex === undefined || !usuarioCorreo) {
      throw new Error('Faltan parámetros para registrar el voto.');
    }

    try {
      const encuesta = await this.obtenerPorId(encuestaId);
      let votosUsuario = encuesta.votosUsuario || {};
      if (votosUsuario instanceof Map) {
        votosUsuario = Object.fromEntries(votosUsuario);
      }
      const votantes = Array.isArray(encuesta.votantes) ? [...encuesta.votantes] : [];
      
      const votoAnterior = votosUsuario[usuarioCorreo];
      
      const opcionesActualizadas = encuesta.opciones.map((op, idx) => {
        const texto = (op && op.texto) ? op.texto.toString() : '';
        const votosPrev = (op && (op.votos !== undefined)) ? op.votos : 0;
        
        if (votoAnterior !== undefined && idx === votoAnterior) {
          return {
            texto: texto,
            votos: Math.max(0, votosPrev - 1)
          };
        }
        
        if (idx === opcionIndex) {
          return {
            texto: texto,
            votos: votosPrev + 1
          };
        }
        
        return {
          texto: texto,
          votos: votosPrev
        };
      });
      
      if (votoAnterior === undefined && !votantes.includes(usuarioCorreo)) {
        votantes.push(usuarioCorreo);
      }
      
      votosUsuario[usuarioCorreo] = opcionIndex;
      const EncuestaModel = require('../models/Encuesta');
      await EncuestaModel.updateOne(
        { _id: encuestaId },
        {
          $set: {
            opciones: opcionesActualizadas,
            votantes: votantes,
            votosUsuario: votosUsuario
          }
        }
      );

      return await this.obtenerPorId(encuestaId);
    } catch (error) {
      throw new Error(`Error al votar: ${error.message}`);
    }
  }
}

module.exports = EncuestaManager;

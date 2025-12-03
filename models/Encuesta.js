const mongoose = require('../db');

const encuestaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    creador: {
      type: String,
      required: true,
      trim: true
    },
    opciones: [
      {
        texto: {
          type: String,
          required: true,
          trim: true
        },
        votos: {
          type: Number,
          default: 0,
          min: 0
        }
      }
    ],
    votantes: {
      type: [String],
      default: []
    },
    votosUsuario: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true 
  }
);

const EncuestaModel = mongoose.model('Encuesta', encuestaSchema);

class Encuesta {
  constructor(data = {}) {
    this.data = {
      ...data,
      votosUsuario: data.votosUsuario || {},
      votantes: data.votantes || []
    };
  }

  async guardar() {
    // Asegurar que votosUsuario sea Object antes de guardar
    const dataToSave = { ...this.data };
    if (dataToSave.votosUsuario && dataToSave.votosUsuario instanceof Map) {
      dataToSave.votosUsuario = Object.fromEntries(dataToSave.votosUsuario);
    }
    const encuesta = new EncuestaModel(dataToSave);
    return await encuesta.save();
  }

  static async obtenerTodas() {
    return await EncuestaModel.find();
  }

  static async obtenerPorCreador(creador) {
    return await EncuestaModel.find({ creador });
  }

  static async obtenerPorId(id) {
    return await EncuestaModel.findById(id);
  }

  static async actualizar(id, datos) {
    return await EncuestaModel.findByIdAndUpdate(id, datos, { new: true });
  }

  static async eliminar(id) {
    return await EncuestaModel.findByIdAndDelete(id);
  }
}

module.exports = EncuestaModel;
module.exports.EncuestaClass = Encuesta;
const mongoose = require('../db');

const comentarioSchema = new mongoose.Schema(
  {
    usuario: {
      type: String,
      required: true,
      trim: true
    },
    contenido: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    encuestaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Encuesta',
      required: true
    }
  },
  {
    timestamps: true 
  }
);

const ComentarioModel = mongoose.model('Comentario', comentarioSchema);

class Comentario {
  constructor(data = {}) {
    this.data = data;
  }

  async guardar() {
    const comentario = new ComentarioModel(this.data);
    return await comentario.save();
  }

  static async obtenerPorEncuesta(encuestaId) {
    return await ComentarioModel.find({ encuestaId });
  }

  static async actualizar(id, datos) {
    return await ComentarioModel.findByIdAndUpdate(id, datos, { new: true });
  }

  static async eliminar(id) {
    return await ComentarioModel.findByIdAndDelete(id);
  }
}

module.exports = ComentarioModel;
module.exports.ComentarioClass = Comentario;
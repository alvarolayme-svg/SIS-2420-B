const mongoose = require('../db');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Formato de correo invalido']
    },
    Password: {
      type: String,
      required: true,
      minlength: 4
    },
    rol: {
      type: String,
      enum: ['usuario', 'admin'],
      default: 'usuario'
    }
  },
  {
    timestamps: true 
  }
);
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('Password')) return next();
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});
usuarioSchema.methods.validarPassword = function (input) {
  return bcrypt.compare(input, this.Password);
};

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

class Usuario {
  constructor(data = {}) {
    this.data = data;
  }

  async guardar() {
    const usuario = new UsuarioModel(this.data);
    return await usuario.save();
  }

  static async encontrarPorCorreo(correo) {
    return await UsuarioModel.findOne({ correo });
  }

  static async encontrarPorId(id) {
    return await UsuarioModel.findById(id);
  }
}

module.exports = UsuarioModel;
module.exports.UsuarioClass = Usuario;
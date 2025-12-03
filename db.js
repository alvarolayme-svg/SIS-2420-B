const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://alvaro_db:12345@cluster0.woadz6f.mongodb.net/encuestas_db?appName=Cluster0';

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error de conexion a MongoDB:', err);
});

db.once('open', () => {
  console.log('Conectado a MongoDB');
});

module.exports = mongoose;
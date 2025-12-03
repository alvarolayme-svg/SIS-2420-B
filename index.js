const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('./db');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, 'public');
console.log('Sirviendo archivos estáticos desde:', publicPath);
app.use(express.static(publicPath));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false,
    error: err.message || 'Error interno del servidor' 
  });
});

mongoose.connection.once('open', () => {
  console.log('base de datos establecida');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
  }
  /*app.listen(PORT, () => {
    console.log(`✓ Servidor en http://localhost:${PORT}`);
  }*/
);
});

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a BD:', err.message);
});


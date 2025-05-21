const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const Plataforma = require('./models/Plataforma');  // Asegúrate de importar correctamente el modelo

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://root:root@cluster0.pqxkrsp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.log('Error de conexión a MongoDB:', err));

// Ruta para obtener las plataformas
app.get('/api/plataformas', async (req, res) => {
  try {
    const plataformas = await Plataforma.find();  // Obtener las plataformas desde MongoDB
    res.json(plataformas);  // Enviar la respuesta con las plataformas
  } catch (error) {
    console.error('Error al obtener las plataformas:', error);
    res.status(500).json({ message: 'Error al obtener las plataformas' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

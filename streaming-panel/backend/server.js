const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const plataformaRoutes = require('./routes/plataformaRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose.connect('mongodb+srv://juandavidburbano030:18122022@cluster0.4ddx9lq.mongodb.net/Streaming', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.log('Error de conexión:', err));

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/plataformas', authMiddleware, plataformaRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

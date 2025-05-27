// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario'); // necesitas este modelo

// Registro
router.post('/register', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const hashed = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ correo, contraseña: hashed });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(400).json({ message: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario || !(await bcrypt.compare(contraseña, usuario.contraseña))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el login' });
  }
});

module.exports = router;

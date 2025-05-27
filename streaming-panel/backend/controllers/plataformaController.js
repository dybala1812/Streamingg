const plataformaService = require('../services/plataformaService');

// Controlador para obtener todas las plataformas
const obtenerPlataformas = async (req, res) => {
  try {
    const plataformas = await plataformaService.obtenerPlataformas();
    res.status(200).json(plataformas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para agregar una nueva plataforma
const agregarPlataforma = async (req, res) => {
  try {
    const nuevaPlataforma = await plataformaService.agregarPlataforma(req.body);
    res.status(201).json(nuevaPlataforma);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para editar una plataforma existente
const editarPlataforma = async (req, res) => {
  try {
    const plataformaActualizada = await plataformaService.editarPlataforma(req.params.id, req.body);
    res.status(200).json(plataformaActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una plataforma
const eliminarPlataforma = async (req, res) => {
  try {
    const resultado = await plataformaService.eliminarPlataforma(req.params.id);
    res.status(204).json({ message: 'Plataforma eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerPlataformas,
  agregarPlataforma,
  editarPlataforma,
  eliminarPlataforma,
};

// services/plataformaService.js
const Plataforma = require('../models/Plataforma');

// Función para agregar una nueva plataforma
const agregarPlataforma = async (plataformaData) => {
  const nuevaPlataforma = new Plataforma(plataformaData);
  await nuevaPlataforma.save();
  return nuevaPlataforma;
};

// Función para obtener todas las plataformas
const obtenerPlataformas = async () => {
  return await Plataforma.find();
};

// Función para editar una plataforma existente
const editarPlataforma = async (id, plataformaData) => {
  try {
    // Buscar la plataforma por ID y actualizarla con los nuevos datos
    const plataformaActualizada = await Plataforma.findByIdAndUpdate(id, plataformaData, { new: true });
    
    // Si no se encuentra la plataforma
    if (!plataformaActualizada) {
      throw new Error('Plataforma no encontrada');
    }

    return plataformaActualizada;
  } catch (error) {
    throw new Error(`Error al editar la plataforma: ${error.message}`);
  }
};

// Función para eliminar una plataforma
const eliminarPlataforma = async (id) => {
  const plataformaEliminada = await Plataforma.findByIdAndDelete(id);
  return plataformaEliminada;
};

module.exports = {
  agregarPlataforma,
  obtenerPlataformas,
  editarPlataforma,  // Asegúrate de que esta función esté exportada
  eliminarPlataforma,
};

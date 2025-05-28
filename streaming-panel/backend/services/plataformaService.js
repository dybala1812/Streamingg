// services/plataformaService.js
const Plataforma = require('../models/Plataforma');

// Agregar una nueva plataforma
const agregarPlataforma = async (plataformaData) => {
  const nuevaPlataforma = new Plataforma(plataformaData);
  await nuevaPlataforma.save();
  return nuevaPlataforma;
};

// Obtener todas las plataformas
const obtenerPlataformas = async () => {
  return await Plataforma.find();
};

// Editar una plataforma
const editarPlataforma = async (id, plataformaData) => {
  try {
    const plataformaActualizada = await Plataforma.findByIdAndUpdate(id, plataformaData, { new: true });
    if (!plataformaActualizada) {
      throw new Error('Plataforma no encontrada');
    }
    return plataformaActualizada;
  } catch (error) {
    throw new Error(`Error al editar la plataforma: ${error.message}`);
  }
};

// Eliminar una plataforma
const eliminarPlataforma = async (id) => {
  const plataformaEliminada = await Plataforma.findByIdAndDelete(id);
  return plataformaEliminada;
};

// ✅ Agregar una cuenta a una plataforma
const agregarCuentaAPlataforma = async (plataformaId, cuentaData) => {
  const plataforma = await Plataforma.findById(plataformaId);
  if (!plataforma) {
    throw new Error('Plataforma no encontrada');
  }

  plataforma.cuentas.push(cuentaData);
  await plataforma.save();
  return plataforma;
};

module.exports = {
  agregarPlataforma,
  obtenerPlataformas,
  editarPlataforma,
  eliminarPlataforma,
  agregarCuentaAPlataforma, // 👈 nuevo
};

const Plataforma = require('../models/Plataforma'); // Asegúrate de tener el modelo correcto

// Función para obtener todas las plataformas
const obtenerPlataformas = async (req, res) => {
  try {
    const plataformas = await Plataforma.find(); // Obtiene todas las plataformas desde la base de datos
    res.json(plataformas); // Devuelve los datos al frontend
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Función para agregar una nueva plataforma
const agregarPlataforma = async (req, res) => {
  const nuevaPlataforma = new Plataforma({
    nombre: req.body.nombre,
    correo: req.body.correo,
    contraseña: req.body.contraseña,
    // Aquí puedes agregar más campos según el modelo de Plataforma
  });

  try {
    const plataforma = await nuevaPlataforma.save();
    res.status(201).json(plataforma); // Devuelve el nuevo registro de la plataforma
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Función para editar una plataforma por su ID
const editarPlataforma = async (req, res) => {
  try {
    const plataforma = await Plataforma.findById(req.params.id);

    if (!plataforma) {
      return res.status(404).json({ message: 'Plataforma no encontrada' });
    }

    // Actualiza los campos de la plataforma
    plataforma.nombre = req.body.nombre || plataforma.nombre;
    plataforma.correo = req.body.correo || plataforma.correo;
    plataforma.contraseña = req.body.contraseña || plataforma.contraseña;

    const plataformaActualizada = await plataforma.save();
    res.json(plataformaActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Función para eliminar una plataforma por su ID
const eliminarPlataforma = async (req, res) => {
  try {
    const plataforma = await Plataforma.findById(req.params.id);

    if (!plataforma) {
      return res.status(404).json({ message: 'Plataforma no encontrada' });
    }

    await plataforma.remove();
    res.json({ message: 'Plataforma eliminada con éxito' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  obtenerPlataformas,
  agregarPlataforma,
  editarPlataforma,
  eliminarPlataforma,
};

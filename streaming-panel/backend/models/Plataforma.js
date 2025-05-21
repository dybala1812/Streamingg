/* // models/Plataforma.js
const mongoose = require('mongoose');

// Definir los esquemas
const perfilSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true },
  pin: { type: String, required: true },
});

const cuentaSchema = new mongoose.Schema({
  plataforma: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  perfiles: [perfilSchema],
  diasActivos: { type: Number },
  diasRestantes: { type: Number },
  estado: { type: String, enum: ['activa', 'vencida'], required: true }
});

const plataformaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cuentas: [cuentaSchema]
});

// Exportar el modelo
module.exports = mongoose.model('Plataforma', plataformaSchema);
 */


// models/Plataforma.js
const mongoose = require('mongoose');

// Definir el esquema de perfil (usuario dentro de la cuenta)
const perfilSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true },
  pin: { type: String, required: true },
});

// Definir el esquema de cuenta
const cuentaSchema = new mongoose.Schema({
  plataforma: { type: String, required: true },    // Ejemplo: "Netflix", "Disney+" etc.
  fechaInicio: { type: Date, required: true },     // Fecha de inicio de la suscripción
  fechaVencimiento: { type: Date },                // Fecha de vencimiento (puede ser calculada en base a `fechaInicio` y `duracionDias`)
  perfiles: [perfilSchema],                        // Lista de perfiles dentro de la cuenta
  diasActivos: { type: Number },                   // Número de días activos desde la fecha de inicio
  diasRestantes: { type: Number },                 // Número de días restantes antes de la expiración
  estado: { type: String, enum: ['activa', 'vencida'], required: true }, // Estado de la cuenta (activa o vencida)
});

// Definir el esquema de plataforma (por ejemplo: "Netflix", "Prime", etc.)
const plataformaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },         // Nombre de la plataforma
  cuentas: [cuentaSchema],                          // Lista de cuentas asociadas a esta plataforma
});

// Exportar el modelo de Plataforma
module.exports = mongoose.model('Plataforma', plataformaSchema);


const express = require('express');
const router = express.Router();
const plataformaController = require('../controllers/plataformaController');

router.get('/', plataformaController.obtenerPlataformas);
router.post('/', plataformaController.agregarPlataforma);
router.put('/:id', plataformaController.editarPlataforma);
router.delete('/:id', plataformaController.eliminarPlataforma);

router.post('/:id/cuentas', plataformaController.agregarCuentaAPlataforma);

module.exports = router;

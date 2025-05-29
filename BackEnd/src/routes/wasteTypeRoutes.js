const express = require('express');
const router = express.Router();
const wasteTypeController = require('../controllers/wasteTypeController');

// Rotas para WasteTypes
router.get('/', wasteTypeController.getAllWasteTypes);
router.post('/', wasteTypeController.createWasteType);
router.delete('/:id', wasteTypeController.deleteWasteType);
router.put('/:id', wasteTypeController.updateWasteType);

module.exports = router; 
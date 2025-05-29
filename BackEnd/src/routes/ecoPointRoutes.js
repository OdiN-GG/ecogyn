const express = require('express');
const router = express.Router();
const ecoPointController = require('../controllers/ecoPointController');

// Rotas para EcoPoints
router.get('/', ecoPointController.getAllEcoPoints);
router.get('/:id', ecoPointController.getEcoPointById);
router.post('/', ecoPointController.createEcoPoint);
router.put('/:id', ecoPointController.updateEcoPoint);
router.delete('/:id', ecoPointController.deleteEcoPoint);

module.exports = router;    
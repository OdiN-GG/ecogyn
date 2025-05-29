const mongoose = require('mongoose');

const wasteTypeSchema = new mongoose.Schema({
  nameType: {
    type: String,
    required: [true, 'Nome do tipo é obrigatório'],
    trim: true
  },
  cor: {
    type: String,
    required: [true, 'Cor é obrigatória'],
    trim: true
  }
});

module.exports = mongoose.model('WasteType', wasteTypeSchema); 
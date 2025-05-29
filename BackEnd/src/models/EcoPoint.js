const mongoose = require('mongoose');
const wasteTypeSchema = require('./WasteType').schema;

const ecoPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Endereço é obrigatório'],
    trim: true
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude é obrigatória'],
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude é obrigatória'],
    min: -180,
    max: 180
  },
  wasteTypes: {
    type: [wasteTypeSchema],
    required: [true, 'Pelo menos um tipo de resíduo é obrigatório'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Pelo menos um tipo de resíduo é obrigatório'
    }
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true
  },
  openingHours: {
    type: String,
    required: [true, 'Horário de funcionamento é obrigatório'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'URL da imagem é obrigatória'],
    trim: true
  }
}, {
  timestamps: true
});

// Índice para busca por localização
ecoPointSchema.index({ latitude: 1, longitude: 1 });

module.exports = mongoose.model('EcoPoint', ecoPointSchema); 



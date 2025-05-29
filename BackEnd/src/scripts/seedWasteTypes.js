const mongoose = require('mongoose');
const WasteType = require('../models/WasteType');
require('dotenv').config();

const wasteTypes = [
  {
    nameType: 'Plástico',
    cor: 'Amarelo'
  },
  {
    nameType: 'Vidro',
    cor: 'Verde'
  },
  {
    nameType: 'Papel',
    cor: 'Azul'
  },
  {
    nameType: 'Metal',
    cor: 'Vermelho'
  },
  {
    nameType: 'Orgânico',
    cor: 'Marrom'
  }
];

const seedWasteTypes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Limpar tipos existentes
    await WasteType.deleteMany({});
    console.log('Tipos de resíduo existentes removidos');

    // Inserir novos tipos
    await WasteType.insertMany(wasteTypes);
    console.log('Tipos de resíduo inseridos com sucesso');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular tipos de resíduo:', error);
    process.exit(1);
  }
};

seedWasteTypes(); 
const EcoPoint = require('../models/EcoPoint');

// Obter todos os ecopontos
exports.getAllEcoPoints = async (req, res) => {
  try {
    const ecoPoints = await EcoPoint.find();
    res.json(ecoPoints);
  } catch (error) {
    console.error('Erro ao buscar ecopontos:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obter um ecoponto por ID
exports.getEcoPointById = async (req, res) => {
  try {
    const ecoPoint = await EcoPoint.findById(req.params.id);
    if (!ecoPoint) {
      return res.status(404).json({ message: 'Ecoponto não encontrado' });
    }
    res.json(ecoPoint);
  } catch (error) {
    console.error('Erro ao buscar ecoponto por ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Criar um novo ecoponto
exports.createEcoPoint = async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    
    // Validar dados obrigatórios
    const requiredFields = ['name', 'address', 'latitude', 'longitude', 'wasteTypes', 'description', 'openingHours', 'imageUrl'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios faltando', 
        fields: missingFields 
      });
    }

    // Validar wasteTypes
    if (!Array.isArray(req.body.wasteTypes) || req.body.wasteTypes.length === 0) {
      return res.status(400).json({ 
        message: 'wasteTypes deve ser um array não vazio' 
      });
    }

    // Validar cada wasteType
    const wasteTypeFields = ['nameType', 'cor'];
    for (const wasteType of req.body.wasteTypes) {
      const missingWasteTypeFields = wasteTypeFields.filter(field => !wasteType[field]);
      if (missingWasteTypeFields.length > 0) {
        return res.status(400).json({ 
          message: 'Campos obrigatórios faltando em wasteType', 
          fields: missingWasteTypeFields 
        });
      }
    }

    const ecoPoint = new EcoPoint(req.body);
    const newEcoPoint = await ecoPoint.save();
    console.log('Ecoponto criado com sucesso:', newEcoPoint);
    res.status(201).json(newEcoPoint);
  } catch (error) {
    console.error('Erro ao criar ecoponto:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors || error
    });
  }
};

// Atualizar um ecoponto
exports.updateEcoPoint = async (req, res) => {
  try {
    const ecoPoint = await EcoPoint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!ecoPoint) {
      return res.status(404).json({ message: 'Ecoponto não encontrado' });
    }
    res.json(ecoPoint);
  } catch (error) {
    console.error('Erro ao atualizar ecoponto:', error);
    res.status(400).json({ message: error.message });
  }
};

// Deletar um ecoponto
exports.deleteEcoPoint = async (req, res) => {
  try {
    const ecoPoint = await EcoPoint.findByIdAndDelete(req.params.id);
    if (!ecoPoint) {
      return res.status(404).json({ message: 'Ecoponto não encontrado' });
    }
    res.json({ message: 'Ecoponto removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar ecoponto:', error);
    res.status(500).json({ message: error.message });
  }
}; 
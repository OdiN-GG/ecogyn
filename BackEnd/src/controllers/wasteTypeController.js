const WasteType = require('../models/WasteType');

// Obter todos os tipos de resíduo
exports.getAllWasteTypes = async (req, res) => {
  try {
    const wasteTypes = await WasteType.find();
    res.json(wasteTypes);
  } catch (error) {
    console.error('Erro ao buscar tipos de resíduo:', error);
    res.status(500).json({ message: error.message });
  }
};

// Criar um novo tipo de resíduo
exports.createWasteType = async (req, res) => {
  try {
    const wasteType = new WasteType(req.body);
    const newWasteType = await wasteType.save();
    res.status(201).json(newWasteType);
  } catch (error) {
    console.error('Erro ao criar tipo de resíduo:', error);
    res.status(400).json({ message: error.message });
  }
}; 

// Deletar um tipo de resíduo
exports.deleteWasteType = async (req, res) => {
  try {
    const { id } = req.params;
    await WasteType.findByIdAndDelete(id);
    res.status(204).json(WasteType);
  } catch (error) {
    console.error('Erro ao deletar tipo de resíduo:', error);
    res.status(500).json({ message: error.message });
  }
};    

// Atualizar um tipo de resíduo
exports.updateWasteType = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWasteType = await WasteType.findByIdAndUpdate(id, req.body, { new: true });  
    res.json(updatedWasteType);
  } catch (error) {
    console.error('Erro ao atualizar tipo de resíduo:', error);
    res.status(500).json({ message: error.message });
  }
};    




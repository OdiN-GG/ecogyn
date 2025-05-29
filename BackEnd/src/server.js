const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/ecopoints', require('./routes/ecoPointRoutes'));
app.use('/api/waste-types', require('./routes/wasteTypeRoutes'));

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API de Ecopontos funcionando!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 
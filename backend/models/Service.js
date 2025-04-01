const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A service must have a name'],
    trim: true,
    unique: true,
    enum: [
      'Troca de óleo',
      'Alinhamento',
      'Balanceamento',
      'Troca de pneus',
      'Revisão de freios',
      'Manutenção elétrica',
      'Suspensão',
      'Ar condicionado',
      'Troca de bateria',
      'Diagnóstico eletrônico'
    ]
  },
  description: {
    type: String,
    trim: true
  },
  averageDuration: {
    type: Number,
    required: [true, 'A service must have an average duration'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  category: {
    type: String,
    enum: ['Preventiva', 'Corretiva', 'Diagnóstico', 'Estética'],
    required: [true, 'A service must have a category']
  }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Documentation', 'Video Tutorials', 'Cheat Sheets', 'Practice Problems', 'Tools & Libraries'],
    default: 'Documentation'
  },
  desc: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);

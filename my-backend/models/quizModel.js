// backend/models/quizModel.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);

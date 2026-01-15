const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, // Enforce unique titles
    },
    questions: [
      {
        question: { type: String, required: true },
        options: {
          type: [String],
          validate: {
            validator: function (v) {
              return v.length === 4; // Ensuring exactly 4 options
            },
            message: 'There must be exactly 4 options.',
          },
        },
        correctAnswer: { type: String, required: true },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: 'User', // Make sure 'User' matches the name of your User model
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

module.exports = mongoose.model('Quiz', quizSchema);
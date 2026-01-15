// backend/seeder.js
const mongoose = require('mongoose');
const Quiz = require('./models/quizModel');
require('dotenv').config();

const quizzes = [
  {
    title: "JavaScript Basics",
    description: "Test your knowledge of JavaScript fundamentals.",
    questions: [
      {
        questionText: "What is the correct syntax for referring to an external script called 'app.js'?",
        options: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"],
        correctAnswer: "<script src='app.js'>"
      },
      {
        questionText: "Which built-in method calls a function for each element in an array?",
        options: ["while()", "loop()", "forEach()", "None of the above"],
        correctAnswer: "forEach()"
      }
    ]
  },
  {
    title: "React Basics",
    description: "A basic quiz on React concepts.",
    questions: [
      {
        questionText: "What is JSX?",
        options: ["A templating engine", "A JavaScript syntax extension", "A CSS framework", "None of the above"],
        correctAnswer: "A JavaScript syntax extension"
      },
      {
        questionText: "Which hook is used for state management in functional components?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "useState"
      }
    ]
  }
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log('MongoDB connected. Seeding data...');
    return Quiz.insertMany(quizzes);
  })
  .then(() => {
    console.log('Quizzes seeded successfully.');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding quizzes:', error);
    mongoose.connection.close();
  });

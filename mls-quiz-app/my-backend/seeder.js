// backend/seeder.js
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const User = require('./models/User'); // We might need a user to "own" the quizzes
const bcrypt = require('bcrypt');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected. Seeding data...');

    // Clear existing data (Optional, but good for a fresh start)
    await Quiz.deleteMany({});
    await User.deleteMany({});

    // Create a default admin/teacher user
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedAdminPassword,
      role: 'teacher'
    });
    await adminUser.save();
    console.log('Admin user created.');

    const quizzes = [
      {
        title: "JavaScript Basics",
        questions: [
          {
            question: "What is the correct syntax for referring to an external script called 'app.js'?",
            options: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"],
            correctAnswer: "<script src='app.js'>"
          },
          {
            question: "Which built-in method calls a function for each element in an array?",
            options: ["while()", "loop()", "forEach()", "None of the above"],
            correctAnswer: "forEach()"
          }
        ],
        createdBy: adminUser._id
      },
      {
        title: "React Fundamentals",
        questions: [
          {
            question: "What is JSX?",
            options: ["A templating engine", "A JavaScript syntax extension", "A CSS framework", "None of the above"],
            correctAnswer: "A JavaScript syntax extension"
          },
          {
            question: "Which hook is used for state management in functional components?",
            options: ["useState", "useEffect", "useContext", "useReducer"],
            correctAnswer: "useState"
          }
        ],
        createdBy: adminUser._id
      }
    ];

    await Quiz.insertMany(quizzes);
    console.log('Quizzes seeded successfully.');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();

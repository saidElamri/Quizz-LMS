const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Adjust the path as necessary
const Quiz = require('./models/Quiz'); // Assuming you have a separate Quiz model file
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);

// Set the strictPopulate option
mongoose.set('strictPopulate', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a quiz
app.post('/api/quizzes', async (req, res) => {
  const { title, questions } = req.body;

  // Validate incoming quiz structure
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Questions are required.' });
  }

  for (const question of questions) {
    if (question.options.length !== 4) {
      return res.status(400).json({ error: 'Each question must have exactly 4 options.' });
    }
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debugging: Log the decoded token to verify user ID
    console.log('Decoded token:', decoded);

    const newQuiz = new Quiz({
      title,
      questions,
      createdBy: decoded.id, // Ensure decoded.id is correct
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Quiz validation failed', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});


// Fetch all quizzes
app.get('/api/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'username');
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Fetch a quiz by ID
app.get('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'username');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Fetch quizzes by teacher
app.get('/api/quizzes/teacher', async (req, res) => {
  try {
    // Verify the user token to ensure only authenticated users can fetch their quizzes
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const quizzes = await Quiz.find({ createdBy: decoded.id });
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching teacher quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Return 400 error if email is already in use
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    // Respond with 500 error for server issues
    res.status(500).json({ error: 'Error registering user' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

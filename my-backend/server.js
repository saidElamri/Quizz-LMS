const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Quiz = require('./models/Quiz');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

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
app.post('/api/quizzes', authMiddleware, async (req, res) => {
  const { title, questions } = req.body;

  // Validate incoming quiz structure
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required and must be a string.' });
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Questions are required.' });
  }

  for (const question of questions) {
    if (!question.options || !Array.isArray(question.options) || question.options.length !== 4) {
      return res.status(400).json({ error: 'Each question must have exactly 4 options.' });
    }
    if (!question.text || typeof question.text !== 'string') {
       return res.status(400).json({ error: 'Each question must have text.' });
    }
  }

  try {
    const newQuiz = new Quiz({
      title,
      questions,
      createdBy: req.user.id,
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
app.get('/api/quizzes/teacher', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.id });
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

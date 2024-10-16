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

  try {
    // Verify the user token to ensure only authenticated users can create quizzes
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newQuiz = new Quiz({
      title,
      questions,
      createdBy: decoded.id,
    });

    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

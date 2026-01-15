const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a quiz
router.post('/', async (req, res) => {
  const { title, questions } = req.body;

  try {
    const newQuiz = new Quiz({ title, questions });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Fetch all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

module.exports = router;

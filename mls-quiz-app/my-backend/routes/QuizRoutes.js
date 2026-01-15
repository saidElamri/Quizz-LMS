const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const User = require('../models/User');
const Notification = require('../models/Notification');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth');

router.post('/:id/submit', authenticate, async (req, res) => {
  const { answers } = req.body;
  const quizId = req.params.id;
  const userId = req.user.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'MODULE_NOT_FOUND' });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const percentage = (score / quiz.questions.length) * 100;
    const xpGained = score * 10;

    // Save result
    const newResult = new Result({
      user: userId,
      quiz: quizId,
      score,
      totalQuestions: quiz.questions.length,
      percentage
    });
    await newResult.save();

    // Update user stats
    const updateQuery = {
      $inc: { xp: xpGained, completedQuizzes: 1 }
    };
    if (percentage >= 90) {
      updateQuery.$addToSet = { badges: `Master of ${quiz.title}` };
    }
    await User.findByIdAndUpdate(userId, updateQuery);

    // Create Notification
    const notif = new Notification({
      recipient: userId,
      title: 'Assessment Complete',
      message: `You completed "${quiz.title}" with a mastery index of ${percentage}%.`,
      type: 'ASSESSMENT_COMPLETE'
    });
    await notif.save();

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      xpGained,
      percentage
    });
  } catch (error) {
    console.error('Submission processing failure:', error);
    res.status(500).json({ error: 'SUBMISSION_SEQ_ERROR' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { title, category, questions } = req.body;

  try {
    const userId = req.user.id;

    const newQuiz = new Quiz({
      title,
      category,
      questions,
      createdBy: userId,
    });

    await newQuiz.save();

    // Broadcast notification to all (null recipient)
    const broadcast = new Notification({
        title: 'New Module Published',
        message: `A new assessment module "${title}" is now available in the hub.`,
        type: 'MODULE_PUBLISHED',
        recipient: null
    });
    await broadcast.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Fetch all quizzes with real-time stats
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'username');
    const quizIds = quizzes.map(q => q._id);
    
    // Aggregate results for performance metrics
    const performanceData = await Result.aggregate([
      { $match: { quiz: { $in: quizIds } } },
      { $group: {
          _id: "$quiz",
          avgSuccess: { $avg: "$percentage" },
          totalAttempts: { $sum: 1 }
      }}
    ]);

    const statsMap = performanceData.reduce((acc, curr) => {
      acc[curr._id] = {
        avgSuccess: Math.round(curr.avgSuccess),
        totalAttempts: curr.totalAttempts
      };
      return acc;
    }, {});

    const enrichedQuizzes = quizzes.map(q => ({
      ...q._doc,
      stats: statsMap[q._id] || { avgSuccess: 0, totalAttempts: 0 }
    }));

    res.json(enrichedQuizzes);
  } catch (error) {
    console.error('Error fetching enriched quizzes:', error);
    res.status(500).json({ error: 'MODULE_SYNC_FAILURE' });
  }
});

// Fetch personal cognitive growth (score over time)
router.get('/stats/activity', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const activity = await Result.find({ user: decoded.id })
      .sort({ completedAt: 1 })
      .select('percentage completedAt')
      .limit(20);

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'GROWTH_METRIC_FAILURE' });
  }
});

// Fetch teacher analytics
router.get('/teacher/stats', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const quizzes = await Quiz.find({ createdBy: userId });
    const quizIds = quizzes.map(q => q._id);

    const results = await Result.find({ quiz: { $in: quizIds } });
    
    const totalEnrolled = new Set(results.map(r => r.user.toString())).size;
    const meanMastery = results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / results.length)
      : 0;

    const quizStats = quizIds.reduce((acc, id) => {
      acc[id] = results.filter(r => r.quiz.toString() === id.toString()).length;
      return acc;
    }, {});

    res.json({
      totalEnrolled,
      meanMastery,
      quizStats
    });
  } catch (error) {
    console.error('Error fetching teacher stats:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Fetch all student results for teacher's quizzes
router.get('/teacher/results', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const teacherQuizzes = await Quiz.find({ createdBy: userId }).select('_id');
    const quizIds = teacherQuizzes.map(q => q._id);

    const results = await Result.find({ quiz: { $in: quizIds } })
      .populate('user', 'username email')
      .populate('quiz', 'title')
      .sort({ completedAt: -1 });

    res.json(results);
  } catch (error) {
    console.error('Error fetching teacher results:', error);
    res.status(500).json({ error: 'LEDGER_FETCH_FAILURE' });
  }
});

// Fetch personal result history for student
router.get('/my-results', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await Result.find({ user: decoded.id })
      .populate('quiz', 'title category')
      .sort({ completedAt: -1 })
      .limit(10);

    res.json(results);
  } catch (error) {
    console.error('Error fetching my results:', error);
    res.status(500).json({ error: 'HISTORY_FETCH_FAILURE' });
  }
});

// Fetch quizzes by teacher (Moved UP to prevent conflict with /:id)
router.get('/teacher', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const quizzes = await Quiz.find({ createdBy: userId });
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching teacher quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Fetch leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const scholars = await User.find({ role: 'student' })
      .sort({ xp: -1 })
      .limit(10)
      .select('username xp badges');

    const leaderboard = scholars.map((s, index) => ({
      username: s.username,
      score: s.xp,
      badges: s.badges.length,
      rank: index + 1
    }));
    
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'LEADERBOARD_SYNC_FAILURE' });
  }
});

// Fetch a quiz by ID (Moved DOWN)
router.get('/:id', async (req, res) => {
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

// Update a quiz
router.put('/:id', async (req, res) => {
  const { title, category, questions } = req.body;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // Check ownership
    if (quiz.createdBy.toString() !== decoded.id) {
      return res.status(403).json({ error: 'UNAUTHORIZED_MODIFICATION_GUARD: Access denied.' });
    }

    quiz.title = title || quiz.title;
    quiz.category = category || quiz.category;
    quiz.questions = questions || quiz.questions;
    await quiz.save();
    
    res.json(quiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

// Delete a quiz
router.delete('/:id', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // Check ownership
    if (quiz.createdBy.toString() !== decoded.id) {
      return res.status(403).json({ error: 'UNAUTHORIZED_TERMINATION_GUARD: Access denied.' });
    }

    await Quiz.findByIdAndDelete(req.params.id);
    // Optionally delete results associated with this quiz
    await Result.deleteMany({ quiz: req.params.id });
    
    res.json({ message: 'Module terminated successfully.' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

module.exports = router;

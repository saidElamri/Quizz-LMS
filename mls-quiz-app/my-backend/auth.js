const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

// User model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Login endpoint
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Check the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Invalid email or password');
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token and role
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

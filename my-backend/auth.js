const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../my-backend/models/user'); // Adjust the path as necessary
require('dotenv').config();

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

// Login endpoint
router.post('/login', async (req, res) => {
  console.log("Received login data:", req.body);  // Log the incoming request body
  const { identifier, password } = req.body;

  // Check for missing fields
  if (!identifier || !password) {
    console.log("Missing identifier or password");
    return res.status(400).send('Missing identifier or password');
  }

  try {
    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      console.log("No user found with identifier:", identifier);
      return res.status(401).send('Invalid credentials');
    }

    // Check the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Password mismatch for user:", identifier);
      return res.status(401).send('Invalid credentials');
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Login successful for:", identifier);
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

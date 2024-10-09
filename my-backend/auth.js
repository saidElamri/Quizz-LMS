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
  const { identifier, password } = req.body; // Use identifier for both email and username
  const Pattern = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
  console.log(new Error("fkefke"))
  // Checking Identifier valuecls
  
  const field = {}
  if(identifier && identifier.match(Pattern)) {
    field["email"] = identifier;
  } else {
    field["username"] = identifier
  }


  try {
    // Find the user by either email or username
    const user = await User.findOne(field);
    
    // Log the found user (for debugging)
    console.log('Found user:', user);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or email' }); // More specific error message
    }

    // Check the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' }); // More specific error message
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token and role
    res.status(200).json({ token, role: user.role, username: user.username });
  } catch (error) {
    console.error('Error during login:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

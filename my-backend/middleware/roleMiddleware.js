// roleMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to check user role
const checkRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

      if (roles.includes(decoded.role)) {
        next(); // Allow access
      } else {
        return res.status(403).json({ message: 'Access denied: You do not have the required role' });
      }
    });
  };
};

module.exports = checkRole;

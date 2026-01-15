const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'AUTHENTICATION_REQUIRED' });
  
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'TOKEN_REQUIRED' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT_VERIFY_ERR:', err.message);
    res.status(401).json({ error: 'SESSION_INVALID' });
  }
};

module.exports = authenticate;

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = generateToken;

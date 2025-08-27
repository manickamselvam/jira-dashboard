const crypto = require('crypto');
const User = require('../models/User');

exports.generateToken = async (req, res) => {
  const token = crypto.randomBytes(32).toString('hex');
  await User.findByIdAndUpdate(req.user.id, { personalToken: token });
  res.json({ token });
};

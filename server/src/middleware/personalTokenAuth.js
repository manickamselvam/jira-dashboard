const User = require('../models/User');

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return next();

  const token = header.split(' ')[1];
  const user = await User.findOne({ personalToken: token });
  if (!user) return res.status(401).json({ message: 'Invalid PAT' });

  req.user = { id: user._id, role: user.role };
  next();
};

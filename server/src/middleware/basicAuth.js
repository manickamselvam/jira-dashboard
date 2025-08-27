const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Basic ')) return next();

  const [email, password] = Buffer.from(header.split(' ')[1], 'base64')
    .toString()
    .split(':');
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid Basic Auth' });

  req.user = { id: user._id, role: user.role };
  next();
};

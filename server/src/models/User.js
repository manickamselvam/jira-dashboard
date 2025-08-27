const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  personalToken: String, // for PAT flow
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  name: String,
});

module.exports = mongoose.model('User', userSchema);

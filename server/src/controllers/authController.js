const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const setAuthCookie = require('../utils/setAuthCookie');
const generateToken = require('../utils/jwt');

const app = express();
app.use(express.json());

exports.register = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ ...rest, password: hash, role: 'admin' });

    const token = generateToken(user);
    setAuthCookie(res, token);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    setAuthCookie(res, token); // sets httpOnly cookie
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.authCheck = (req, res) => {
  res.json({ user: req.user });
};

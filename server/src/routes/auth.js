const express = require('express');
const router = express.Router();
const {
  register,
  login,
  authCheck,
  logout,
} = require('../controllers/authController');
const validate = require('../middleware/validate');
const { signupSchema, loginSchema } = require('../validations/authValidator');
const { verifyAuth } = require('../middleware/authMiddleware');

router.post('/register', validate(signupSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/check-auth', verifyAuth, authCheck);
router.post('/logout', logout);

module.exports = router;

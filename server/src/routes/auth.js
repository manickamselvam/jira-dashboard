const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { signupSchema, loginSchema } = require('../validations/authValidator');

router.post('/register', validate(signupSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;

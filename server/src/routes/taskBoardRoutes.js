const express = require('express');

const { getBoardByProject } = require('../controllers/taskBoardController');
const { verifyAuth } = require('../middleware/authMiddleware');
const validateParams = require('../middleware/validateParams');

const router = express.Router();

router.get(
  '/board/:projectId',
  verifyAuth,
  validateParams(['projectId']),
  getBoardByProject
);

module.exports = router;

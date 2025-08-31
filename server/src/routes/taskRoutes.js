const express = require('express');
const router = express.Router();
const {
  createTask,
  getTaskById,
  getTasksByProjectId,
} = require('../controllers/taskController');
const { createTaskSchema } = require('../validations/taskValidator');
const validate = require('../middleware/validate');
const validateParams = require('../middleware/validateParams');
const { verifyAuth } = require('../middleware/authMiddleware');

router.post('/', verifyAuth, validate(createTaskSchema), createTask); // POST /api/tasks
router.get('/:taskId', verifyAuth, validateParams(['taskId']), getTaskById); // GET /api/tasks/:taskId
router.get(
  '/project/:projectId',
  verifyAuth,
  validateParams(['projectId']),
  getTasksByProjectId
);

module.exports = router;

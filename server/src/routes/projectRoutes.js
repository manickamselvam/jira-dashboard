const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
} = require('../controllers/projectController');
const { createProjectSchema } = require('../validations/projectValidator');
const validate = require('../middleware/validate');
const validateParams = require('../middleware/validateParams');
const { verifyAuth } = require('../middleware/authMiddleware');

router.post('/', verifyAuth, validate(createProjectSchema), createProject); // POST /api/projects
router.get('/', verifyAuth, getAllProjects);
router.get(
  '/:projectId',
  verifyAuth,
  validateParams(['projectId']),
  getProjectById
);

module.exports = router;

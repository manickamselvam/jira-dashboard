const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await Project.create({
      name,
      description,
      createdBy: req.user?.id, // optional if using auth
    });
    res.status(201).json(project);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Project name already exists' });
    }
    res.status(500).json({ message: 'Failed to create project' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    console.log('Get all project called');
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

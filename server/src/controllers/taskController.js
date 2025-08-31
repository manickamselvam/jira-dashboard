// const Task = require('../models/Task');
// import Task from '../models/Task.js';
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, projectId, assignedTo } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      projectId,
      assignedTo,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};

exports.getTasksByProjectId = async (req, res) => {
  try {
    console.log('getTasksByProjectId called', req.params.projectId);
    const tasks = await Task.find({ projectId: req.params.projectId });
    // const tasks = Task.find({
    //   projectId: ObjectId('68b27ad462b131f1e3b0ad4c'),
    // });
    // const tasks = await Task.find({});
    console.log('Tasks:', tasks);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate(
      'projectId assignedTo'
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

// import mongoose from 'mongoose';

// const taskSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   status: {
//     type: String,
//     enum: ['todo', 'in-progress', 'done', 'in-qa'],
//     default: 'todo',
//   },
//   projectId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true,
//   },
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   createdAt: { type: Date, default: Date.now },
// });

// const Task = mongoose.model('Task', taskSchema);
// export default Task;

// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done', 'in-qa'],
    default: 'todo',
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

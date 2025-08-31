import Task from '../models/Task.js';

export const getBoardByProject = async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ projectId });

  console.log('tasks', tasks);

  const columns = {
    todo: { id: 'todo', title: 'To Do', taskIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
    qa: { id: 'qa', title: 'In QA', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] },
  };

  const taskMap = {};
  tasks.forEach((task) => {
    taskMap[task._id] = task;
    columns[task.status]?.taskIds.push(task._id.toString());
  });

  const columnOrder = ['todo', 'in-progress', 'qa', 'done'];

  res.json({ tasks: taskMap, columns, columnOrder });
};

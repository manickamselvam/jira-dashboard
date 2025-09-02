import axiosInstance from '../api/axiosInstance';

export const getTasksByProject = async (projectId) => {
  try {
    console.log('projectId :', projectId);
    const res = await axiosInstance.get(`/tasks/project/${projectId}`, {});
    return res;
  } catch (error) {
    console.log('Error in getTasksByProject :', error);
    return 'failed';
  }
};

export const getTasksById = async (taskId) => {
  try {
    console.log('taskId :', taskId);
    const res = await axiosInstance.get(`/tasks/${taskId}`, {});
    return res;
  } catch (error) {
    console.log('Error in getTasksById :', error);
    return 'failed';
  }
};

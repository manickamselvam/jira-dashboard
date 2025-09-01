import axiosInstance from '../api/axiosInstance';

export const getBoardByProject = async (projectId) => {
  try {
    const res = await axiosInstance.get(`/taskboard/board/${projectId}`, {});
    return res;
  } catch (error) {
    console.log('Error in getTaskBoardData :', error);
    return 'failed';
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await axiosInstance.get(`/tasks`, taskData);
    return res;
  } catch (error) {
    console.log('Error in createTask :', error);
    return 'failed';
  }
};

export const updateTask = async (updates) => {
  try {
    const res = await axiosInstance.put(`/tasks/${taskId}`, updates);
    return res;
  } catch (error) {
    console.log('Error in updateTask :', error);
    return 'failed';
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axiosInstance.delete(`/tasks/${taskId}`, {});
    return res;
  } catch (error) {
    console.log('Error in deleteTask :', error);
    return 'failed';
  }
};

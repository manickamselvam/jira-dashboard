import axiosInstance from '../api/axiosInstance';

export const getProjects = async () => {
  try {
    const res = await axiosInstance.get('/projects', {});
    return res;
  } catch (error) {
    console.log('Error in getProjects :', error);
    return 'failed';
  }
};

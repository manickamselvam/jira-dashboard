import axiosInstance from '../api/axiosInstance';

export const registerUser = async (payload) => {
  try {
    const res = await axiosInstance.post('/auth/register', payload);
    return res.data;
  } catch (error) {
    console.log('Error in registerUser :', error);
    return 'failed';
  }
};

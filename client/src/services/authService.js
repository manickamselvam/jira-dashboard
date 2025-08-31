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

export const checkAuth = async () => {
  try {
    console.log('checkauth called');
    const res = await axiosInstance.get('auth/check-auth', {
      withCredentials: true,
    });
    console.log('auth res :', res);
    return res.data.user;
  } catch (err) {
    console.log('Error checkAuth:', err);
    return null;
  }
};

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

export const loginUser = async (payload) => {
  try {
    const res = await axiosInstance.post('/auth/login', payload);
    return res.data;
  } catch (error) {
    console.log('Error in loginUser :', error);
    return 'failed';
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post('/auth/logout', {});
    return res.data;
  } catch (error) {
    console.log('Error in logout :', error);
    return 'failed';
  }
};

export const checkAuth = async () => {
  try {
    console.log('checkauth called');
    const res = await axiosInstance.get('auth/check-auth', {});
    return res.data.user;
  } catch (err) {
    console.log('Error checkAuth:', err);
    return null;
  }
};

import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // if using cookies or sessions
  timeout: 10000, // optional: request timeout
});

// ✅ Optional: Add interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg = error.response?.data?.message || 'Something went wrong';
    console.error('API Error:', msg);
    return Promise.reject(error);
  }
);

export default axiosInstance;

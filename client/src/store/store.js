import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskBoardReducer from '../features/tasks/taskBoardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    taskBoard: taskBoardReducer,
  },
});

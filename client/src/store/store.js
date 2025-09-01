import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskBoardReducer from '../features/tasks/taskBoardSlice';
import projectReducer from '../features/projects/projectSlice';
import issueReducer from '../features/issues/issueSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    taskBoard: taskBoardReducer,
    projects: projectReducer,
    issues: issueReducer,
  },
});

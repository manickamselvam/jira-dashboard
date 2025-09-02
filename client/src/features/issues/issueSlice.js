import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasksByProject, getTasksById } from '../../services/taskService';

export const fetchTasksByProject = createAsyncThunk(
  'issues/fetchByProject',
  async (projectId) => {
    const res = await getTasksByProject(projectId);
    return res.data;
  }
);

export const fetchTasksById = createAsyncThunk(
  'issues/fetchByTaskId',
  async (taskId) => {
    console.log('fetchByTaskId called:', taskId);
    const res = await getTasksById(taskId);
    console.log('fetchByTaskId res :', res);
    return res.data;
  }
);

const issueSlice = createSlice({
  name: 'issues',
  initialState: { list: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksById.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  },
});

export default issueSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasksByProject } from '../../services/taskService';

export const fetchTasksByProject = createAsyncThunk(
  'issues/fetchByProject',
  async (projectId) => {
    const res = await getTasksByProject(projectId);
    return res.data;
  }
);

const issueSlice = createSlice({
  name: 'issues',
  initialState: { list: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByProject.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    });
  },
});

export default issueSlice.reducer;

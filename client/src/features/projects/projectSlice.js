import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProjects } from '../../services/projectService';

export const fetchProjects = createAsyncThunk('projects/fetchAll', async () => {
  const res = await getProjects();
  console.log('Raw res:', res);
  return res.data;
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: { list: [], loading: true, error: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch projects';
      });
  },
});

export default projectSlice.reducer;

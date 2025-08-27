import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  return [
    { _id: '1', name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { _id: '2', name: 'Bob', email: 'bob@example.com', role: 'user' },
    { _id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'user' },
  ];
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;

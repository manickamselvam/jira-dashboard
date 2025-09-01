import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
  isloggedin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isloggedin = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isloggedin = true;
    },
    logoutSucess: (state) => {
      state.user = null;
      state.loading = false;
      state.isloggedin = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.isloggedin = action.payload.isloggedin;
    },
  },
});

export const { loginSuccess, logoutSucess, registerSuccess, setUser } =
  authSlice.actions;
export default authSlice.reducer;

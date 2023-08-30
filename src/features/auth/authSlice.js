import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, { payload: { token, user } }) {
      state.token = token,
      state.user = user
    }
  },
});

export const { setCredentials } = authSlice.actions;

export const selectToken = state => state.auth.token;
export const selectUser = state => state.auth.user

export default authSlice.reducer;

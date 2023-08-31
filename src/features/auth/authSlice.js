import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../mock/users";

export const statusEnum = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
}

const initialState = {
  token: null,
  user: {},
  loginForm: {
    status: statusEnum.idle,
    error: null
  },
  registerForm: {
    status: statusEnum.idle,
    error: null,
    data: {},
    step: 0
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setRegisterFormStep(state, action) {
      state.registerForm.step = action.payload
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.loginForm.status = statusEnum.loading;
    })
    .addCase(login.rejected, (state, action) => {
      state.loginForm.error = action.error.message
      state.loginForm.status = statusEnum.failed;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loginForm.status = statusEnum.succeeded;
    });

    // sendOTP
    builder.addCase(sendOTP.pending, (state) => {
      state.registerForm.status = statusEnum.loading
    })
    .addCase(sendOTP.fulfilled, (state, action) => {
      state.registerForm.data = { ...state.registerForm.data, ...action.payload }
      state.registerForm.status = statusEnum.idle
      state.registerForm.step = 1
    })

    // sendOTP
    builder.addCase(verifyOTP.pending, (state) => {
      state.registerForm.status = statusEnum.loading
    })
    .addCase(verifyOTP.fulfilled, (state) => {
      state.registerForm.status = statusEnum.idle
    })
  }
});

export const login = createAsyncThunk(
  'auth/login', 
  async function(creds) {
    const user = await getUser(creds.email);
    if (!user) {
      return Promise.reject('Invalid email or password!')
    }
    return user;
  }
)

export const sendOTP = createAsyncThunk(
  'auth/register/sendOTP',
  async function(data) {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000))
    console.log(`Verification code for ${data.phone_number} - 5387`)
    return data
  }
)

export const verifyOTP = createAsyncThunk(
  'auth/register/verifyOTP',
  async function(data) {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000))
    console.log(`${data}`)
    return data
  }
)

export const { setUser, setRegisterFormStep } = authSlice.actions

export const selectToken = state => state.auth.token;
export const selectUser = state => state.auth.user;
export const selectLoginForm = state => state.auth.loginForm;
export const selectRegisterForm = state => state.auth.registerForm;

export default authSlice.reducer;

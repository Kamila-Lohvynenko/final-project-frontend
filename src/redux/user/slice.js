import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {
  login,
  logout,
  refresh,
  register,
  updateUser,
  updateAvatar,
} from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    avatarUrl: null,
    gender: null,
    weight: null,
    timeForSports: null,
    dailyIntake: 0,
  },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.user = payload.user;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.user = payload.user;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = initialState.user;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.token = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.user.avatarUrl = payload;
      }),
});

const persistConfig = {
  key: 'auth',
  storage,
};

const authReducer = persistReducer(persistConfig, authSlice.reducer);

export default authReducer;

import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  updateUser,
  updateAvatar,
  getUserData,
} from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    avatar: null,
    gender: null,
    weight: null,
    activeSportTime: null,
    dailyNorma: 0,
  },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetToken: (state, action) => {
      state.token = action.payload;
    },
    refreshError: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = initialState.user;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.token = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, ...payload.data };
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.user.avatarUrl = payload;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        // console.log(payload);

        state.user = { ...state.user, ...payload };
      }),
});

const persistConfig = {
  key: 'auth',
  storage,
};

export const { refreshError, resetToken } = authSlice.actions;

export const authReducer = persistReducer(persistConfig, authSlice.reducer);

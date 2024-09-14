import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { login, logout, refresh, update } from './operations';

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
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.data.accessToken;
        state.user = payload.data.user;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = initialState.user;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.token = payload.data;
      })
      .addCase(update.fulfilled, (state, { payload }) => {
        state.user = payload.data;
      }),
});

const persistConfig = {
  key: 'auth',
  storage,
};

const authReducer = persistReducer(persistConfig, authSlice.reducer);

export default authReducer;

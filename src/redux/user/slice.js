import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { login, logout, refresh, update } from './operations';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      name: null,
      email: null,
      avatarUrl: null,
      sex: null,
      weight: null,
      timeForSports: null,
      litersADay: 0,
    },
    token: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.user = payload.user;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.token = payload;
      })
      .addCase(update.fulfilled, (state, { payload }) => {
        state.user = payload;
      }),
});

const persistConfig = {
  key: 'user',
  storage,
};

const userReducer = persistReducer(persistConfig, userSlice.reducer);

export default userReducer;

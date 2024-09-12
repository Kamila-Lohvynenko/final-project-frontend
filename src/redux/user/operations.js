import { createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../../services/auth';

export const register = createAsyncThunk(
  'user/register',
  async (userCredentials, thunkApi) => {
    try {
      const {
        data: { data },
      } = await authService.register(userCredentials);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (userCredentials, thunkApi) => {
    try {
      const {
        data: { data },
      } = await authService.login(userCredentials);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    await authService.logout();
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

export const update = createAsyncThunk(
  'user/update',
  async (fieldsToUpdate, thunkApi) => {
    try {
      const {
        data: { data },
      } = await authService.update(fieldsToUpdate);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const refresh = createAsyncThunk('user/refresh', async (_, thunkApi) => {
  try {
    const {
      data: { data },
    } = await authService.refresh();

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

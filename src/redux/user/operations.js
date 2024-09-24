import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  axiosInstance,
  clearAuthToken,
  setAuthToken,
} from '../../services/axios.config';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userCredentials, thunkApi) => {
    try {
      await axiosInstance.post('/users/register', userCredentials);

      const {
        data: {
          data: { accessToken },
        },
      } = await axiosInstance.post('users/login', userCredentials);
      console.log(accessToken);

      setAuthToken(accessToken);

      return { accessToken: accessToken };
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userCredentials, thunkApi) => {
    try {
      const {
        data: {
          data: { accessToken },
        },
      } = await axiosInstance.post('users/login', userCredentials);

      setAuthToken(accessToken);

      return { accessToken: accessToken };
    } catch (error) {
      console.log(error);

      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkApi) => {
    try {
      await axiosInstance.post('users/logout');
      clearAuthToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (fieldsToUpdate, thunkApi) => {
    try {
      const { data } = await axiosInstance.patch(
        '/users/userId',
        fieldsToUpdate,
      );

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  'user/refresh',
  async (_, thunkApi) => {
    try {
      const {
        data: {
          data: { accessToken },
        },
      } = await axiosInstance.post('/users/refresh');

      setAuthToken(accessToken);

      return accessToken;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (file, thunkApi) => {
    try {
      const {
        data: {
          data: { avatar },
        },
      } = await axiosInstance.patch('users/avatar', file);
      return avatar;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      setAuthToken(state.auth.token);

      const response = await axiosInstance.get('users/data');

      const data = response.data.data;
      // console.log(data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

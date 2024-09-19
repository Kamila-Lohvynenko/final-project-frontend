import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../services/axios.config';

export const addWater = createAsyncThunk(
  'water/add',
  async (portionData, thunkApi) => {
    try {
      const { data } = await axiosInstance.post('/water', portionData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateWater = createAsyncThunk(
  'water/update',
  async ({ id, portionData }, thunkApi) => {
    try {
      await axiosInstance.patch(`/water/${id}`, portionData);
      return portionData.id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteWater = createAsyncThunk(
  'water/delete',
  async (id, thunkApi) => {
    try {
      const { data } = await axiosInstance.delete(`/water/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const getWaterByMonth = createAsyncThunk(
  'water/getByMonth',
  async (params, thunkApi) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post('/water/month', params);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const getWaterByDay = createAsyncThunk(
  'water/getByDay',
  async (params, thunkApi) => {
    try {
      const {
        data: { resultData },
      } = await axiosInstance.post('/water/day', params);

      return resultData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import waterService from '../../services/water';

export const addWater = createAsyncThunk(
  'water/add',
  async (portionData, thunkApi) => {
    try {
      const { data } = await waterService.addWater(portionData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateWater = createAsyncThunk(
  'water/update',
  async (portionData, thunkApi) => {
    try {
      await waterService.updateWater(portionData);
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
      const { data } = await waterService.deleteWater(id);
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
      } = await waterService.getWaterByMonth(params);
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
        data: { data },
      } = await waterService.getWaterByDay(params);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

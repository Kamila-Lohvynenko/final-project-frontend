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
  async ({ id, portionData }, thunkApi) => {
    try {
      await waterService.updateWater(id, portionData);
      return id;
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
  async (thunkApi) => {
    try {
      const { data } = await waterService.getWaterByMonth();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  },
);

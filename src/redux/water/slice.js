import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import {
  addWater,
  deleteWater,
  getWaterByDay,
  getWaterByMonth,
  updateWater,
} from './operations';

const initialState = {
  monthIntakes: [],
  dailyIntakes: [],
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getWaterByMonth.fulfilled, (state, { payload }) => {
        state.monthIntakes = payload;
      })
      .addCase(getWaterByDay.fulfilled, (state, { payload }) => {
        state.dailyIntakes = payload;
      })
      .addCase(addWater.fulfilled, (state, { payload }) => {
        state.monthIntakes.push(payload.data);
      })
      .addCase(updateWater.fulfilled, (state, { payload }) => {
        const indexToUpdate = state.monthIntakes.findIndex(
          ({ _id }) => _id === payload.data._id,
        );

        state.monthIntakes[indexToUpdate] = payload.data;
      })
      .addCase(deleteWater.fulfilled, (state, { payload }) => {
        state.monthIntakes = state.monthIntakes.filter(
          ({ _id }) => _id === payload.id,
        );
      }),
});

const persistConfig = {
  key: 'water',
  storage,
};

const waterReducer = persistReducer(persistConfig, waterSlice.reducer);

export default waterReducer;

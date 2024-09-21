import { createSlice } from '@reduxjs/toolkit';

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
        // console.log(payload);

        state.dailyIntakes = payload;
      })
      .addCase(addWater.fulfilled, (state, { payload }) => {
        console.log(payload.data);

        state.monthIntakes.push(payload.data);
        state.dailyIntakes.records.push(payload.data);
      })
      .addCase(updateWater.fulfilled, (state, { payload }) => {
        const indexToUpdate = state.monthIntakes.findIndex(
          ({ _id }) => _id === payload.data._id,
        );

        state.monthIntakes[indexToUpdate] = payload.data;
      })
      .addCase(deleteWater.fulfilled, (state, { payload }) => {
        // console.log(payload);

        state.monthIntakes = state.monthIntakes.filter(
          ({ _id }) => _id !== payload.id,
        );
        state.dailyIntakes.records = state.dailyIntakes.records.filter(
          ({ _id }) => _id !== payload.id,
        );
      }),
});

const waterReducer = waterSlice.reducer;

export default waterReducer;

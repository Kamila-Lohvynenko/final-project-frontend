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
  dailyIntakes: {
    records: [],
    percentage: '0',
    totalWater: '0',
    dailyNorma: '1500',
  }, //Изменено на объект с полем records
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
        // console.log(payload.data);

        state.monthIntakes.push(payload.data);
        state.dailyIntakes.records.push(payload.data);

        state.dailyIntakes.totalWater = state.dailyIntakes.records.reduce(
          (sum, record) => sum + record.amount,
          0,
        );
      })
      .addCase(updateWater.fulfilled, (state, { payload }) => {
        console.log(payload);

        const indexToUpdateMonth = state.monthIntakes.findIndex(
          ({ _id }) => _id === payload._id,
        );
        if (indexToUpdateMonth !== -1) {
          state.monthIntakes[indexToUpdateMonth] = payload;
        }
        const indexToUpdateDate = state.dailyIntakes.records.findIndex(
          ({ _id }) => _id === payload._id,
        );

        if (indexToUpdateDate !== -1) {
          state.dailyIntakes.records[indexToUpdateDate] = payload;
        }
      })
      .addCase(deleteWater.fulfilled, (state, { payload }) => {
        // console.log(payload);

        state.monthIntakes = state.monthIntakes.filter(
          ({ _id }) => _id !== payload.id,
        );
        state.dailyIntakes.records = state.dailyIntakes.records.filter(
          ({ _id }) => _id !== payload.id,
        );
        state.dailyIntakes.totalWater = state.dailyIntakes.records.reduce(
          (sum, record) => sum + record.amount,
          0,
        );
      }),
});

const waterReducer = waterSlice.reducer;

export default waterReducer;

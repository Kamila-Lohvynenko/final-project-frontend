import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import {
  addWater,
  deleteWater,
  getWaterByMonth,
  updateWater,
} from './operations';

const initialState = {
  items: [],
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getWaterByMonth.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addWater.fulfilled, (state, { payload }) => {
        state.items.push(payload.data);
      })
      .addCase(updateWater.fulfilled, (state, { payload }) => {
        const indexToUpdate = state.items.findIndex(
          ({ _id }) => _id === payload.data._id,
        );

        state.items[indexToUpdate] = payload.data;
      })
      .addCase(deleteWater.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(({ _id }) => _id === payload.id);
      }),
});

const persistConfig = {
  key: 'water',
  storage,
};

const waterReducer = persistReducer(persistConfig, waterSlice.reducer);

export default waterReducer;

export const selectWaterByMonth = (state) => state.water.monthIntakes;
export const selectWaterDayRecords = (state) =>
  state.water.dailyIntakes.records;
export const selectDayPercentage = (state) =>
  state.water.dailyIntakes.percentage;
export const selectTotalWaterByDay = (state) =>
  state.water.dailyIntakes.totalWater;

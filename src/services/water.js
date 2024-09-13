import { waterClient } from './axios.config';

const addWater = (portionData) => waterClient.post('/', portionData);

const updateWater = (id, portionData) =>
  waterClient.patch(`/${id}`, portionData);

const deleteWater = (id) => waterClient.delete(`/${id}`);

const getWaterByDay = () => waterClient.get('/day');

const getWaterByMonth = () => waterClient.get('/month');

export default {
  addWater,
  updateWater,
  deleteWater,
  getWaterByDay,
  getWaterByMonth,
};

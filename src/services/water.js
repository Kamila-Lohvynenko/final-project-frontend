import { waterClient } from './axios.config';

waterClient.defaults;

const addWater = (portionData) => waterClient.post('/', portionData);

const updateWater = ({ id, ...portionData }) =>
  waterClient.patch(`/${id}`, portionData);

const deleteWater = (id) => waterClient.delete(`/${id}`);

const getWaterByDay = ({ day, month, year }) =>
  waterClient.get('/day', {
    params: {
      day,
      month,
      year,
    },
  });

const getWaterByMonth = ({ month, year }) =>
  waterClient.get(`/month`, {
    params: {
      month,
      year,
    },
  });

export default {
  addWater,
  updateWater,
  deleteWater,
  getWaterByDay,
  getWaterByMonth,
};

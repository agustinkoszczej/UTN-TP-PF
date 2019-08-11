import api from '@config/api';

const getActiveOrders = () => api.get('/merchants/orders', { active: true });

const getPastOrders = () => api.get('/merchants/orders', { active: false });

export default {
  getActiveOrders,
  getPastOrders
};

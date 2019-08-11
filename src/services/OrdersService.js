import api from '@config/api';

const getCurrentOrders = () => api.get('/merchants/orders', { active: true });

const getPastOrders = () => api.get('/merchants/orders', { active: false });

export default {
  getCurrentOrders,
  getPastOrders
};

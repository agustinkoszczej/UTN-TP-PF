import api from '@config/api';

const getActiveOrders = () => api.get('/merchants/orders', { active: true });

const getPastOrders = () => api.get('/merchants/orders', { active: false });

const getOrderById = id => api.get(`/merchants/orders/${id}`);

export default {
  getActiveOrders,
  getPastOrders,
  getOrderById
};

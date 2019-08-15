import api from '@config/api';

const getActiveOrders = page => api.get('/merchants/orders', { active: true, page });

const getPastOrders = page => api.get('/merchants/orders', { active: false, page });

const getOrderById = id => api.get(`/merchants/orders/${id}`);

export default {
  getActiveOrders,
  getPastOrders,
  getOrderById
};

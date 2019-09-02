import api from '@config/api';

const getActiveOrders = page => api.get('/merchants/orders', { active: true, page });

const getPastOrders = page => api.get('/merchants/orders', { active: false, page });

const getOrderById = id => api.get(`/merchants/orders/${id}`);

const createOrder = order => api.post('/merchants/orders', order);

const rateOrder = ({ id, ...score }) => api.post(`/merchants/orders/${id}/ratings`, { ...score });
export default {
  getActiveOrders,
  getPastOrders,
  getOrderById,
  createOrder,
  rateOrder
};

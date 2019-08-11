import api from '@config/api';

const getCurrentOrders = () => api.get('/merchants/orders');

export default {
  getCurrentOrders
};

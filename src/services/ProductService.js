import api from '@config/api';

const getSupplierProducts = supplierId => api.get('/merchants/catalogs', { supplierId });

export default {
  getSupplierProducts
};

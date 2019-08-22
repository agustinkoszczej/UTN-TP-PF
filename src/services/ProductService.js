import api from '@config/api';

const getSupplierProducts = supplierId => api.get('/merchants/catalogs', { supplierId });

const getProducts = description => api.get('/products', { description });

export default {
  getSupplierProducts,
  getProducts
};

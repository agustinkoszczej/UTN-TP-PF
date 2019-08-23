import api from '@config/api';

const getSupplierProducts = supplierId => api.get('/merchants/catalogs', { supplierId });

const getProducts = description => api.get('/products', { description });

const getProductById = id => api.get(`/products/${id}`);

export default {
  getSupplierProducts,
  getProducts,
  getProductById
};

import { completeTypes, createTypes } from 'redux-recompose';
import ProductService from '@services/ProductService';

export const actions = createTypes(
  completeTypes(['GET_SUPPLIER_PRODUCTS', 'GET_PRODUCTS', 'GET_PRODUCT_BY_ID'], ['CLEAR_CATALOG']),
  '@@PRODUCTS'
);

const targets = {
  catalog: 'catalog',
  currentProduct: 'currentProduct'
};

export const actionCreators = {
  getSupplierProducts: id => ({
    type: actions.GET_SUPPLIER_PRODUCTS,
    target: targets.catalog,
    payload: id,
    service: ProductService.getSupplierProducts,
    successSelector: response => response.data.products
  }),
  getProducts: search => ({
    type: actions.GET_PRODUCTS,
    target: targets.catalog,
    payload: search,
    service: ProductService.getProducts
  }),
  getProductById: id => ({
    type: actions.GET_PRODUCT_BY_ID,
    target: targets.currentProduct,
    payload: id,
    service: ProductService.getProductById
  }),
  clearCatalog: () => ({
    type: actions.CLEAR_CATALOG,
    target: targets.catalog
  })
};

export default actionCreators;

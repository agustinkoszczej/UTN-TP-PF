import { completeTypes, createTypes } from 'redux-recompose';
import ProductService from '@services/ProductService';

export const actions = createTypes(
  completeTypes(['GET_SUPPLIER_PRODUCTS', 'GET_PRODUCTS'], []),
  '@@PRODUCTS'
);

const targets = {
  catalog: 'catalog'
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
  })
};

export default actionCreators;

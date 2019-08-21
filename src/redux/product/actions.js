import { completeTypes, createTypes } from 'redux-recompose';
import ProductService from '@services/ProductService';

export const actions = createTypes(completeTypes(['GET_SUPPLIER_PRODUCTS'], []), '@@PRODUCTS');

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
  })
};

export default actionCreators;

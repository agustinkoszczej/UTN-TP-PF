import { completeTypes, createTypes } from 'redux-recompose';
import OrdersService from '@services/OrdersService';

export const actions = createTypes(completeTypes(['GET_CURRENT_ORDERS'], []), '@@ORDERS');

const targets = {
  currentOrders: 'currentOrders'
};

export const actionCreators = {
  getCurrentOrders: () => ({
    type: actions.GET_CURRENT_ORDERS,
    target: targets.currentOrders,
    service: OrdersService.getCurrentOrders
  })
};

export default actionCreators;

import { completeTypes, createTypes } from 'redux-recompose';
import OrdersService from '@services/OrdersService';

export const actions = createTypes(completeTypes(['GET_CURRENT_ORDERS', 'GET_PAST_ORDERS'], []), '@@ORDERS');

const targets = {
  currentOrders: 'currentOrders',
  pastOrders: 'pastOrders'
};

export const actionCreators = {
  getCurrentOrders: () => ({
    type: actions.GET_CURRENT_ORDERS,
    target: targets.currentOrders,
    service: OrdersService.getCurrentOrders
  }),
  getPastOrders: () => ({
    type: actions.GET_PAST_ORDERS,
    target: targets.pastOrders,
    service: OrdersService.getPastOrders
  })
};

export default actionCreators;

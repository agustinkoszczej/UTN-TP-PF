import { completeTypes, createTypes } from 'redux-recompose';
import OrdersService from '@services/OrdersService';

import { ordersSerialiazer } from './utils';

export const actions = createTypes(completeTypes(['GET_ACTIVE_ORDERS', 'GET_PAST_ORDERS'], []), '@@ORDERS');

const targets = {
  activeOrders: 'activeOrders',
  pastOrders: 'pastOrders'
};

export const actionCreators = {
  getActiveOrders: () => ({
    type: actions.GET_ACTIVE_ORDERS,
    target: targets.activeOrders,
    service: OrdersService.getActiveOrders,
    successSelector: response => ordersSerialiazer(response.data)
  }),
  getPastOrders: () => ({
    type: actions.GET_PAST_ORDERS,
    target: targets.pastOrders,
    service: OrdersService.getPastOrders,
    successSelector: response => ordersSerialiazer(response.data)
  })
};

export default actionCreators;

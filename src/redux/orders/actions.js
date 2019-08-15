import { completeTypes, createTypes } from 'redux-recompose';
import OrdersService from '@services/OrdersService';

import { ordersSerialiazer } from './utils';

export const actions = createTypes(
  completeTypes(
    [
      'GET_ACTIVE_ORDERS',
      'GET_PAST_ORDERS',
      'REFRESH_ACTIVE_ORDERS',
      'REFRESH_PAST_ORDERS',
      'GET_ORDER_BY_ID'
    ],
    []
  ),
  '@@ORDERS'
);

const targets = {
  activeOrders: 'activeOrders',
  pastOrders: 'pastOrders',
  currentOrder: 'currentOrder'
};

export const actionCreators = {
  getActiveOrders: page => ({
    type: actions.GET_ACTIVE_ORDERS,
    target: targets.activeOrders,
    service: OrdersService.getActiveOrders,
    payload: page || 1,
    successSelector: response => ordersSerialiazer(response.data)
  }),
  getPastOrders: page => ({
    type: actions.GET_PAST_ORDERS,
    target: targets.pastOrders,
    service: OrdersService.getPastOrders,
    payload: page || 1,
    successSelector: response => ordersSerialiazer(response.data)
  }),
  refreshActiveOrders: () => ({
    type: actions.REFRESH_ACTIVE_ORDERS,
    target: targets.activeOrders,
    service: OrdersService.getActiveOrders,
    successSelector: response => ordersSerialiazer(response.data)
  }),
  refreshPastOrders: () => ({
    type: actions.REFRESH_PAST_ORDERS,
    target: targets.pastOrders,
    service: OrdersService.getPastOrders,
    successSelector: response => ordersSerialiazer(response.data)
  }),
  getOrderById: id => ({
    type: actions.GET_ORDER_BY_ID,
    target: targets.currentOrder,
    service: OrdersService.getOrderById,
    payload: id
  })
};

export default actionCreators;

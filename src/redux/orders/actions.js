import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import OrdersService from '@services/OrdersService';
import DialogActions from '@redux/dialog/actions';
import { getHomeDialog, homeDialogNames } from '@screens/Home/dialogs';

export const actions = createTypes(
  completeTypes(
    [
      'GET_ACTIVE_ORDERS',
      'GET_PAST_ORDERS',
      'REFRESH_ACTIVE_ORDERS',
      'REFRESH_PAST_ORDERS',
      'GET_ORDER_BY_ID',
      'CREATE_ORDER',
      'RATE_ORDER'
    ],
    []
  ),
  '@@ORDERS'
);

const targets = {
  activeOrders: 'activeOrders',
  pastOrders: 'pastOrders',
  currentOrder: 'currentOrder',
  createOrder: 'createOrder',
  rate: 'rate'
};

export const actionCreators = {
  getActiveOrders: page => ({
    type: actions.GET_ACTIVE_ORDERS,
    target: targets.activeOrders,
    service: OrdersService.getActiveOrders,
    payload: page || 1
  }),
  getPastOrders: page => ({
    type: actions.GET_PAST_ORDERS,
    target: targets.pastOrders,
    service: OrdersService.getPastOrders,
    payload: page || 1
  }),
  refreshActiveOrders: () => ({
    type: actions.REFRESH_ACTIVE_ORDERS,
    target: targets.activeOrders,
    service: OrdersService.getActiveOrders
  }),
  refreshPastOrders: () => ({
    type: actions.REFRESH_PAST_ORDERS,
    target: targets.pastOrders,
    service: OrdersService.getPastOrders
  }),
  getOrderById: id => ({
    type: actions.GET_ORDER_BY_ID,
    target: targets.currentOrder,
    service: OrdersService.getOrderById,
    payload: id
  }),
  createOrder: order => ({
    type: actions.CREATE_ORDER,
    target: targets.createOrder,
    service: OrdersService.createOrder,
    payload: order,
    injections: [
      withPostSuccess(async dispatch => {
        dispatch(DialogActions.showDialog(getHomeDialog(homeDialogNames.FINISH_CREATION_ORDER)()));
      })
    ]
  }),
  rateOrder: (id, rating) => ({
    type: actions.RATE_ORDER,
    target: targets.rate,
    service: OrdersService.rateOrder,
    payload: { id, score: rating },
    injections: [
      withPostSuccess(async dispatch => {
        dispatch(DialogActions.closeDialog());
        dispatch(actionCreators.getOrderById(id));
      })
    ]
  })
};

export default actionCreators;

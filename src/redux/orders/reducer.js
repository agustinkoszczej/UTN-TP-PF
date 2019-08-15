import { createReducer, completeReducer, completeState, onSuccess } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const ordersSelector = (action, state) => {
  if (!state[action.target]) {
    return action.payload;
  }
  return {
    pages: state[action.target].pages,
    total: state[action.target].total,
    orders: [...state[action.target].orders, ...action.payload.orders]
  };
};

const stateDescription = {
  activeOrders: null,
  pastOrders: null,
  currentOrder: null
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [
    actions.GET_ACTIVE_ORDERS,
    actions.GET_PAST_ORDERS,
    actions.GET_ORDER_BY_ID,
    actions.REFRESH_ACTIVE_ORDERS,
    actions.REFRESH_PAST_ORDERS
  ],
  override: {
    [actions.GET_ACTIVE_ORDERS_SUCCESS]: onSuccess(ordersSelector),
    [actions.GET_PAST_ORDERS_SUCCESS]: onSuccess(ordersSelector)
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  activeOrders: [],
  pastOrders: []
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_ACTIVE_ORDERS, actions.GET_PAST_ORDERS],
  override: {}
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

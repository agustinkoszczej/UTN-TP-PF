import { createReducer, completeReducer, completeState, onSetValue } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  catalog: []
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_SUPPLIER_PRODUCTS, actions.GET_PRODUCTS],
  override: {
    [actions.CLEAR_CATALOG]: onSetValue([])
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

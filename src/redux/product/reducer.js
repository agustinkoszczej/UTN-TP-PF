import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  catalog: []
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_SUPPLIER_PRODUCTS]
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

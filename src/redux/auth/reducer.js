import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  currentUser: null
};

const initialState = completeState(stateDescription, ['initialLoading']);

const reducerDescription = {
  primaryActions: [actions.LOGIN],
  override: {}
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  currentUser: null,
  recoverPassword: null
};

const initialState = completeState(stateDescription, ['initialLoading']);

const reducerDescription = {
  primaryActions: [actions.LOGIN, actions.RECOVER_PASSWORD],
  override: {}
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

import { createReducer, completeReducer, completeState, onSetValue } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  currentUser: null,
  recoverPassword: null,
  signUpUser: null
};

const initialState = completeState(stateDescription, ['initialLoading']);

const reducerDescription = {
  primaryActions: [actions.LOGIN, actions.RECOVER_PASSWORD, actions.SIGN_UP, actions.GET_USER_INFO],
  override: { [actions.LOG_OUT]: onSetValue(null) }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

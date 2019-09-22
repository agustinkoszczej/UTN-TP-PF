import { createReducer, completeReducer, completeState, onSetValue } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  currentUser: null,
  recoverPassword: null,
  signUpUser: null,
  updateUser: null,
  agenda: null,
  suppliers: [],
  stats: null,
  acceptContact: null,
  declineContact: null
};

const initialState = completeState(stateDescription, ['initialLoading']);

const reducerDescription = {
  primaryActions: [
    actions.LOGIN,
    actions.RECOVER_PASSWORD,
    actions.SIGN_UP,
    actions.GET_USER_INFO,
    actions.UPDATE_USER,
    actions.GET_AGENDA,
    actions.GET_SUPPLIERS,
    actions.GET_STATS
  ],
  override: {
    [actions.LOG_OUT]: onSetValue(null),
    [actions.CLEAN_SIGN_UP_ERROR]: onSetValue(null),
    [actions.CLEAR_SUPPLIERS]: onSetValue([])
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

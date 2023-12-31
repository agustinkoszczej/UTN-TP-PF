import { createReducer, completeReducer, completeState, onSetValue } from 'redux-recompose';
import Immutable from 'seamless-immutable';
import onReadValue from 'redux-recompose/lib/effects/onReadValue';

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
  acceptContactLoadingId: null,
  deleteContact: null,
  deleteContactLoadingId: null,
  currentSupplier: null,
  contact: null
};

const initialState = completeState(stateDescription, [
  'initialLoading',
  'acceptContactLoadingId',
  'deleteContactLoadingId'
]);

const reducerDescription = {
  primaryActions: [
    actions.LOGIN,
    actions.RECOVER_PASSWORD,
    actions.SIGN_UP,
    actions.GET_USER_INFO,
    actions.UPDATE_USER,
    actions.GET_AGENDA,
    actions.GET_SUPPLIERS,
    actions.GET_STATS,
    actions.GET_SUPPLIER_BY_ID,
    actions.ADD_CONTACT,
    actions.DELETE_CONTACT
  ],
  override: {
    [actions.LOG_OUT]: onSetValue(null),
    [actions.CLEAN_SIGN_UP_ERROR]: onSetValue(null),
    [actions.CLEAN_SUPPLIER]: onSetValue(null),
    [actions.CLEAR_SUPPLIERS]: onSetValue([]),
    [actions.SET_ACCEPT_CONTACT_ID]: onReadValue(),
    [actions.SET_DELETE_CONTACT_ID]: onReadValue()
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

import Immutable from 'seamless-immutable';
import { onReadValue, createReducer } from 'redux-recompose';

import { actions } from './actions';

const initialState = {
  dialog: null,
  isVisible: false
};

const reducerDescription = {
  [actions.SET_DIALOG]: onReadValue(),
  [actions.SHOW_DIALOG]: onReadValue(),
  [actions.CLOSE_DIALOG]: onReadValue(),
  [actions.DELETE_DIALOG]: onReadValue()
};

export default createReducer(Immutable(initialState), reducerDescription);

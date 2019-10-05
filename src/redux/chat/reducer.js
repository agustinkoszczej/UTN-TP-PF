import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  rooms: []
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_PUSHER_MANAGER],
  override: {}
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

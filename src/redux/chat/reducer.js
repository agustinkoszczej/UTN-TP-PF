import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  pusherConnection: null,
  rooms: []
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_PUSHER_MANAGER],
  override: {
    [actions.SET_ROOMS]: (state, action) => ({ ...state, rooms: action.payload })
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

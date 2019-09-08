import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  activeAuctions: null,
  expiredAuctions: null,
  closedAuctions: null,
  currentAuction: null
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [
    actions.GET_ACTIVE_AUCTIONS,
    actions.GET_CLOSED_AUCTIONS,
    actions.GET_EXPIRED_AUCTIONS,
    actions.GET_AUCTION_BY_ID
  ],
  override: {}
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

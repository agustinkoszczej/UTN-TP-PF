import { createReducer, completeReducer, completeState, onReadValue } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  activeAuctions: null,
  expiredAuctions: null,
  closedAuctions: null,
  currentAuction: null,
  createAuction: null,
  acceptBid: null,
  declineBid: null,
  acceptBidLoadingId: null,
  declineBidLoadingId: null
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [
    actions.GET_ACTIVE_AUCTIONS,
    actions.GET_CLOSED_AUCTIONS,
    actions.GET_EXPIRED_AUCTIONS,
    actions.GET_AUCTION_BY_ID,
    actions.CREATE_AUCTION,
    actions.ACCEPT_BID,
    actions.DECLINE_BID
  ],
  override: {
    [actions.SET_ACCEPT_BID_LOADING]: onReadValue(),
    [actions.SET_DECLINE_BID_LOADING]: onReadValue()
  }
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));

import { completeTypes, createTypes } from 'redux-recompose';
import AuctionsService from '@services/AuctionsService';

export const actions = createTypes(
  completeTypes(['GET_ACTIVE_AUCTIONS', 'GET_EXPIRED_AUCTIONS', 'GET_CLOSED_AUCTIONS'], []),
  '@@AUCTIONS'
);

const targets = {
  activeAuctions: 'activeAuctions',
  expiredAuctions: 'expiredAuctions',
  closedAuctions: 'closedAuctions'
};

export const actionCreators = {
  getActiveAuctions: page => ({
    type: actions.GET_ACTIVE_AUCTIONS,
    target: targets.activeAuctions,
    service: AuctionsService.getActiveAuctions,
    payload: page || 1
  }),
  getExpiredAuctions: page => ({
    type: actions.GET_EXPIRED_AUCTIONS,
    target: targets.expiredAuctions,
    service: AuctionsService.getExpiredAuctions,
    payload: page || 1
  }),
  getClosedAuctions: page => ({
    type: actions.GET_CLOSED_AUCTIONS,
    target: targets.closedAuctions,
    service: AuctionsService.getClosedAuctions,
    payload: page || 1
  })
};

export default actionCreators;

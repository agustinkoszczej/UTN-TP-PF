import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import AuctionsService from '@services/AuctionsService';
import DialogActions from '@redux/dialog/actions';
import { getHomeDialog, homeDialogNames } from '@screens/Home/dialogs';

export const actions = createTypes(
  completeTypes(
    [
      'GET_ACTIVE_AUCTIONS',
      'GET_EXPIRED_AUCTIONS',
      'GET_CLOSED_AUCTIONS',
      'GET_AUCTION_BY_ID',
      'CREATE_AUCTION'
    ],
    []
  ),
  '@@AUCTIONS'
);

const targets = {
  activeAuctions: 'activeAuctions',
  expiredAuctions: 'expiredAuctions',
  closedAuctions: 'closedAuctions',
  currentAuction: 'currentAuction',
  createAuction: 'createAuction'
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
  }),
  getAuctionById: id => ({
    type: actions.GET_AUCTION_BY_ID,
    target: targets.currentAuction,
    service: AuctionsService.getAuctionById,
    payload: id
  }),
  createAuction: values => ({
    type: actions.CREATE_AUCTION,
    target: targets.createAuction,
    service: AuctionsService.createAuction,
    payload: values,
    injections: [
      withPostSuccess(async dispatch => {
        dispatch(DialogActions.showDialog(getHomeDialog(homeDialogNames.FINISH_CREATION_AUCTION)()));
      })
    ]
  })
};

export default actionCreators;

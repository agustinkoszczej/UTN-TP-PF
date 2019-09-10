import { NavigationActions } from 'react-navigation';
import dialogTypes from '@components/ConnectedDialog/dialogTypes';
import store from '@redux/store';
import OrdersActions from '@redux/orders/actions';
import AuctionsActions from '@redux/auctions/actions';

import { strings } from './constants';

export const homeDialogNames = {
  FINISH_CREATION_ORDER: 'finishCreationOrder',
  FINISH_CREATION_AUCTION: 'finishCreationAuction',
  RATE_ORDER: 'rateOrder'
};

export const getHomeDialog = dialogType =>
  ({
    [homeDialogNames.FINISH_CREATION_AUCTION]: () => ({
      dialogType: dialogTypes.SIMPLE_DIALOG,
      dialogContent: {
        title: strings.auctionCreated,
        message: strings.auctionsCreatedMessage,
        acceptText: strings.continue,
        onAcceptDialog: () => {
          store.dispatch(NavigationActions.back());
          store.dispatch(AuctionsActions.getActiveAuctions());
        }
      }
    }),
    [homeDialogNames.FINISH_CREATION_ORDER]: () => ({
      dialogType: dialogTypes.SIMPLE_DIALOG,
      dialogContent: {
        title: strings.orderCreated,
        message: strings.orderCreatedMessage,
        acceptText: strings.continue,
        onAcceptDialog: () => {
          store.dispatch(NavigationActions.back());
          store.dispatch(OrdersActions.refreshActiveOrders());
        }
      }
    }),
    [homeDialogNames.RATE_ORDER]: () => ({
      dialogType: dialogTypes.RATE_DIALOG
    })
  }[dialogType]);

import { NavigationActions } from 'react-navigation';
import dialogTypes from '@components/ConnectedDialog/dialogTypes';
import store from '@redux/store';
import OrdersActions from '@redux/orders/actions';

import { strings } from './constants';

export const homeDialogNames = {
  FINISH_CREATION_RDER: 'finishCreationOrder',
  RATE_ORDER_MODAL: 'RATE_ORDER_MODAL'
};

export const getHomeDialog = dialogType =>
  ({
    [homeDialogNames.FINISH_SIGN_UP]: () => ({
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
    })
  }[dialogType]);

import { NOTIFICATIONS } from '@constants/pushNotificationTypes';
import AuctionsActions from '@redux/auctions/actions';
import AuthActions from '@redux/auth/actions';
import OrdersActions from '@redux/orders/actions';
import { NavigationActions } from 'react-navigation';
import Routes from '@constants/routes';

const pushNotificationHandlers = notification =>
  ({
    [NOTIFICATIONS.NOTIFICATION_NEW_BID]: dispatch => {
      dispatch(AuctionsActions.getAuctionById(notification.id));
      dispatch(NavigationActions.navigate({ routeName: Routes.AuctionDetail }));
    },
    [NOTIFICATIONS.NOTIFICATION_REQUEST_CONTACT]: dispatch => {
      dispatch(AuthActions.getAgenda('', () => dispatch(AuthActions.getSupplierById(notification.user_id))));
      dispatch(NavigationActions.navigate({ routeName: Routes.SupplierProfile }));
    },
    [NOTIFICATIONS.NOTIFICATION_ORDER_UPDATED]: dispatch => {
      const { id } = JSON.parse(notification.order);
      dispatch(OrdersActions.getOrderById(id));
      dispatch(NavigationActions.navigate({ routeName: Routes.OrderDetail, params: { id } }));
    },
    [NOTIFICATIONS.NOTIFICATION_NEW_MESSAGE]: (dispatch, state) => {
      const room = state.chat.rooms.find(
        roomm => roomm.roomId === JSON.parse(notification.messages)[0].room_id
      );
      dispatch(NavigationActions.navigate({ routeName: Routes.SupplierChat, params: room }));
    },
    [NOTIFICATIONS.NOTIFICATION_EXPIRED_AUCTION]: dispatch => {
      dispatch(AuctionsActions.getAuctionById(notification.id));
      dispatch(NavigationActions.navigate({ routeName: Routes.AuctionDetail }));
    }
  }[notification.type]);

export const getPushNotificationHandler = notification => {
  let handler = pushNotificationHandlers(notification);
  if (!handler) {
    console.warn(`Push notification with type ${notification.type} is not being handled`);
    handler = () => {};
  }
  return handler;
};

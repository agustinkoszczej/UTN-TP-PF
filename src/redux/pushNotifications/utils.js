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
    [NOTIFICATIONS.NOTIFICATION_ORDER_CREATED]: 'Pedido creado',
    [NOTIFICATIONS.NOTIFICATION_REQUEST_CONTACT]: dispatch => {
      dispatch(AuthActions.getSupplierById(notification.user_id));
      dispatch(NavigationActions.navigate({ routeName: Routes.SupplierProfile }));
    },
    [NOTIFICATIONS.NOTIFICATION_ORDER_UPDATED]: dispatch => {
      const { id } = JSON.parse(notification.order);
      dispatch(OrdersActions.getOrderById(id));
      dispatch(NavigationActions.navigate({ routeName: Routes.OrderDetail, params: { id } }));
    },
    [NOTIFICATIONS.NOTIFICATION_NEW_MESSAGE]: 'Nuevo mensaje',
    [NOTIFICATIONS.NOTIFICATION_EXPIRED_AUCTION]: dispatch => {
      dispatch(AuctionsActions.getAuctionById(notification.id));
      dispatch(NavigationActions.navigate({ routeName: Routes.AuctionDetail }));
    }
  }[notification.type]);

const hasTypeNotification = type => notifications =>
  notifications.length && notifications.some(notification => notification.type === type);

export const getPushNotificationHandler = (pushType, id) => {
  let handler = pushNotificationHandlers(pushType, id);
  if (!handler) {
    console.warn(`Push notification with type ${pushType} is not being handled`);
    handler = () => {};
  }
  return handler;
};

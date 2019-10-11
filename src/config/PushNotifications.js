import PushNotification from 'react-native-push-notification';
import AuthService from '@services/AuthService';
import PushNotificationsService from '@services/PushNotificationsService';

import NotificationActions from '../redux/pushNotifications/actions'; // eslint-disable-line import/first

const formatReceivedNotification = push => {
  if (push.alert && push.alert.APNS_SANDBOX) {
    push.alert = JSON.parse(push.alert.APNS_SANDBOX).aps.alert;
  }
  if (push.message && push.message.APNS_SANDBOX) {
    push.message = JSON.parse(push.message.APNS_SANDBOX).aps.message;
  }
  return push;
};

export default function setUp(dispatch) {
  PushNotification.configure({
    async onRegister(data) {
      dispatch(NotificationActions.register(data.token));
      const userLogged = await AuthService.isLogged();
      if (userLogged) {
        dispatch(NotificationActions.updateToken());
      }
    },
    onNotification(notification) {
      dispatch(NotificationActions.notificationReceived(formatReceivedNotification(notification)));
      const totalNotifications = parseInt(notification.total_notifications, 10);
      if (!notification.userInteraction && Number.isInteger(totalNotifications)) {
        PushNotificationsService.setApplicationIconBadgeNumber(totalNotifications);
      }
    },
    senderID: 'a',
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  });
}

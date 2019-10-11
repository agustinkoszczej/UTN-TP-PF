import NotificationActions from '@redux/pushNotifications/actions';

const pushNotificationHandlers = (type, id) => undefined;

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

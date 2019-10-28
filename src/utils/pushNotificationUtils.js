import { NOTIFICATIONS } from '@constants/pushNotificationTypes';

export const pushMessage = notification => {
  const { type } = notification;
  const sender = notification.sender ? JSON.parse(notification.sender).fullName : '';
  return {
    [NOTIFICATIONS.NOTIFICATION_NEW_BID]: 'Nueva oferta recibida',
    [NOTIFICATIONS.NOTIFICATION_ORDER_CREATED]: 'Pedido creado',
    [NOTIFICATIONS.NOTIFICATION_REQUEST_CONTACT]: 'Nueva solictud de contacto',
    [NOTIFICATIONS.NOTIFICATION_ORDER_UPDATED]: 'Pedido actualizado',
    [NOTIFICATIONS.NOTIFICATION_NEW_MESSAGE]: `Nuevo mensaje de ${sender}`,
    [NOTIFICATIONS.NOTIFICATION_EXPIRED_AUCTION]: 'Subasta expirada'
  }[type];
};

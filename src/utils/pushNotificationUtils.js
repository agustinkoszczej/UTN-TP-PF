import { NOTIFICATIONS } from '@constants/pushNotificationTypes';

export const pushMessage = ({ type }) =>
  ({
    [NOTIFICATIONS.NOTIFICATION_NEW_BID]: 'Nueva oferta recibida',
    [NOTIFICATIONS.NOTIFICATION_ORDER_CREATED]: 'Pedido creado',
    [NOTIFICATIONS.NOTIFICATION_REQUEST_CONTACT]: 'Nueva solictud de conexión',
    [NOTIFICATIONS.NOTIFICATION_ORDER_UPDATED]: 'Pedido actualizado',
    [NOTIFICATIONS.NOTIFICATION_NEW_MESSAGE]: 'Nuevo mensaje',
    [NOTIFICATIONS.NOTIFICATION_EXPIRED_AUCTION]: 'Subasta expirada'
  }[type] || 'Nueva notificación');

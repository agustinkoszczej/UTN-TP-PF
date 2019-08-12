import { ORDER_STATUS } from '@constants/orderStatus';

import styles from './styles';

export const ORDER_STYLES = {
  [ORDER_STATUS.CANCELLED]: styles.redTag,
  [ORDER_STATUS.REJECTED]: styles.redTag,
  [ORDER_STATUS.DELIVERED]: styles.greenTag,
  [ORDER_STATUS.ON_WAY]: styles.greenTag,
  [ORDER_STATUS.CONFIRMED]: styles.greenTag,
  [ORDER_STATUS.PENDING]: styles.yellowTag
};

export const ORDER_STATUS_STRINGS = {
  [ORDER_STATUS.CANCELLED]: 'Cancelado',
  [ORDER_STATUS.REJECTED]: 'Rechazado',
  [ORDER_STATUS.DELIVERED]: 'Entregado',
  [ORDER_STATUS.ON_WAY]: 'En camino',
  [ORDER_STATUS.CONFIRMED]: 'Confirmado',
  [ORDER_STATUS.PENDING]: 'Pendiente'
};

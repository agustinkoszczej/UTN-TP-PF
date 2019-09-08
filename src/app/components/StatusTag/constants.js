import { ORDER_STATUS } from '@constants/orderStatus';
import { AUCTION_STATUS } from '@constants/auctionStatus';

import styles from './styles';

export const ORDER_STYLES = {
  [ORDER_STATUS.CANCELLED]: styles.redTag,
  [ORDER_STATUS.REJECTED]: styles.redTag,
  [ORDER_STATUS.DELIVERED]: styles.greenTag,
  [ORDER_STATUS.ON_WAY]: styles.yellowTag,
  [ORDER_STATUS.CONFIRMED]: styles.greenTag,
  [ORDER_STATUS.PENDING]: styles.yellowTag,
  [AUCTION_STATUS.ACTIVE]: styles.greenTag,
  [AUCTION_STATUS.EXPIRED]: styles.redTag,
  [AUCTION_STATUS.CLOSED]: styles.redTag
};

export const ORDER_STATUS_STRINGS = {
  [ORDER_STATUS.CANCELLED]: 'Cancelado',
  [ORDER_STATUS.REJECTED]: 'Rechazado',
  [ORDER_STATUS.DELIVERED]: 'Entregado',
  [ORDER_STATUS.ON_WAY]: 'En camino',
  [ORDER_STATUS.CONFIRMED]: 'Confirmado',
  [ORDER_STATUS.PENDING]: 'Pendiente',
  [AUCTION_STATUS.ACTIVE]: 'Activa',
  [AUCTION_STATUS.EXPIRED]: 'Expirada',
  [AUCTION_STATUS.CLOSED]: 'Cerrada'
};

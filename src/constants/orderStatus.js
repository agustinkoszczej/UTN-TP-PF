export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  ON_WAY: 'ON_WAY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED'
};

export const IS_ACTIVE_STATUS = status =>
  ({
    PENDING: true,
    CONFIRMED: true,
    ON_WAY: true,
    DELIVERED: false,
    CANCELLED: false,
    REJECTED: false
  }[status]);

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { ORDER_STATUS } from '@constants/orderStatus';

import styles from './styles';

function OrdersSection({ orders }) {
  return (
    <>
      <Card>
        <CustomText center style={styles.title}>
          Pedidos
        </CustomText>
      </Card>
      <>
        <View style={styles.cardsRow}>
          <Card style={[styles.card, styles.yellow]}>
            <CustomText style={styles.white}>Pendientes</CustomText>
            <CustomText style={styles.white}>{orders?.[ORDER_STATUS.PENDING] || 0}</CustomText>
          </Card>
          <Card style={[styles.card, styles.yellow]}>
            <CustomText style={styles.white}>En camino</CustomText>
            <CustomText style={styles.white}>{orders?.[ORDER_STATUS.ON_WAY] || 0}</CustomText>
          </Card>
          <Card style={[styles.card, styles.green]}>
            <CustomText style={styles.white}>Confirmados</CustomText>
            <CustomText style={styles.white}>{orders?.[ORDER_STATUS.CONFIRMED] || 0}</CustomText>
          </Card>
          <Card style={[styles.card, styles.red]}>
            <CustomText style={styles.white}>Cancelados</CustomText>
            <CustomText style={styles.white}>{orders?.[ORDER_STATUS.CANCELLED] || 0}</CustomText>
          </Card>
          <Card style={[styles.card, styles.red]}>
            <CustomText style={styles.white}>Rechazados</CustomText>
            <CustomText style={styles.white}>{orders?.[ORDER_STATUS.REJECTED] || 0}</CustomText>
          </Card>
          <Card style={[styles.card, styles.green]}>
            <CustomText style={styles.white}>Entregados</CustomText>
            <CustomText style={styles.white}>{orders?.[ORDER_STATUS.DELIVERED] || 0}</CustomText>
          </Card>
        </View>
      </>
    </>
  );
}

OrdersSection.propTypes = {
  orders: PropTypes.shape({
    [ORDER_STATUS.DELIVERED]: PropTypes.number.isRequired,
    [ORDER_STATUS.CONFIRMED]: PropTypes.number.isRequired,
    [ORDER_STATUS.REJECTED]: PropTypes.number.isRequired,
    [ORDER_STATUS.ON_WAY]: PropTypes.number.isRequired,
    [ORDER_STATUS.PENDING]: PropTypes.number.isRequired,
    [ORDER_STATUS.CANCELLED]: PropTypes.number.isRequired
  })
};

export default OrdersSection;

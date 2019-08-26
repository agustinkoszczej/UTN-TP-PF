import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import { ORDER_STATUS } from '@constants/orderStatus';

function OrdersSection({ orders }) {
  return (
    <View>
      <View>
        <Card>
          <CustomText>Pendiente</CustomText>
          <CustomText>{orders?.[ORDER_STATUS.PENDING] || 0}</CustomText>
        </Card>
        <Card>
          <CustomText>En camino</CustomText>
          <CustomText>{orders?.[ORDER_STATUS.ON_WAY] || 0}</CustomText>
        </Card>
        <Card>
          <CustomText>Confirmado</CustomText>
          <CustomText>{orders?.[ORDER_STATUS.CONFIRMED] || 0}</CustomText>
        </Card>
      </View>
      <View>
        <Card>
          <CustomText>Cancelado</CustomText>
          <CustomText>{orders?.[ORDER_STATUS.CANCELLED] || 0}</CustomText>
        </Card>
        <Card>
          <CustomText>Rechazado</CustomText>
          <CustomText>{orders?.[ORDER_STATUS.REJECTED] || 0}</CustomText>
        </Card>
        <Card>
          <CustomText>Entregado</CustomText>
          <CustomText>{orders?.[ORDER_STATUS.DELIVERED] || 0}</CustomText>
        </Card>
      </View>
    </View>
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

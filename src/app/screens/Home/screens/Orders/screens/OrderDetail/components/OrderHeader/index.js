import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import StatusTag from '@components/StatusTag';
import Card from '@components/Card';
import { dateFormat } from '@utils/timeUtils';

import styles from './styles';

function OrderHeader({ supplier, receiverName, comment, amount, deliveryDate, status }) {
  const fullName = supplier?.fullName || receiverName;
  return (
    <Card style={styles.cardContainer}>
      <View style={styles.section}>
        <CustomText style={styles.placeholder}>Distribuidor:</CustomText>
        <CustomText bold>{fullName}</CustomText>
      </View>
      <View style={styles.section}>
        <CustomText style={styles.placeholder}>Comentario:</CustomText>
        <CustomText bold>{comment}</CustomText>
      </View>
      <View style={styles.section}>
        <CustomText style={styles.placeholder}>Precio:</CustomText>
        <CustomText bold>{amount}</CustomText>
      </View>
      <View style={styles.section}>
        <CustomText style={styles.placeholder}>Fecha de entrega:</CustomText>
        <CustomText bold>{dateFormat(deliveryDate)}</CustomText>
      </View>
      {status && <StatusTag status={status} />}
    </Card>
  );
}

OrderHeader.propTypes = {
  supplier: PropTypes.shape({
    fullName: PropTypes.string.isRequired
  }).isRequired,
  deliveryDate: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  receiverName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired
};

export default OrderHeader;

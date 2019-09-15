import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import Card from '@components/Card';
import StatusTag from '@components/StatusTag';
import { dateFormat } from '@utils/timeUtils';
import SeparatorWithText from '@components/SeparatorWithText';

import styles from './styles';

function AuctionHeader({ merchant: { fullName }, deliveryDate, expirationDate, status, shared }) {
  return (
    <>
      <Card style={styles.cardContainer}>
        <SeparatorWithText text="Detalle de subasta" style={{ marginBottom: 15 }} />
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Distribuidor:</CustomText>
          <CustomText bold>{fullName}</CustomText>
        </View>
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Fecha de entrega:</CustomText>
          <CustomText bold>{dateFormat(deliveryDate)}</CustomText>
        </View>
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Fecha de expiración:</CustomText>
          <CustomText bold>{dateFormat(expirationDate)}</CustomText>
        </View>
        <View style={styles.section}>
          <CustomText style={styles.placeholder}>Compartida:</CustomText>
          <CustomText bold>{shared ? 'Si' : 'No'}</CustomText>
        </View>
        {status && <StatusTag status={status} />}
      </Card>
    </>
  );
}

AuctionHeader.propTypes = {
  merchant: PropTypes.shape({
    fullName: PropTypes.string
  }),
  status: PropTypes.string,
  shared: PropTypes.bool,
  deliveryDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  expirationDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired
};

export default AuctionHeader;

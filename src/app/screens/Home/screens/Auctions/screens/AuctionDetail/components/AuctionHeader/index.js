import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import Card from '@components/Card';
import { dateFormat } from '@utils/timeUtils';

import styles from './styles';

function AuctionHeader({ merchant: { fullName }, deliveryDate, expirationDate }) {
  return (
    <>
      <Card style={styles.cardContainer}>
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
      </Card>
    </>
  );
}

AuctionHeader.propTypes = {
  merchant: PropTypes.shape({
    fullName: PropTypes.string
  }),
  deliveryDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  expirationDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired
};

export default AuctionHeader;

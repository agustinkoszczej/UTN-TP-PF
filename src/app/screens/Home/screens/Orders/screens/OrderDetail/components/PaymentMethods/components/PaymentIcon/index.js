import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import cashIcon from '@assets/cash.png';
import cardIcon from '@assets/credit_card.png';

function PaymentIcon({ id }) {
  const source = id === 1 ? cashIcon : cardIcon;
  return <Image source={source} style={{ width: 30, height: 30 }} />;
}

PaymentIcon.propTypes = {
  id: PropTypes.number.isRequired
};

export default PaymentIcon;

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import SeparatorWithText from '@components/SeparatorWithText';

import PaymentIcon from './components/PaymentIcon';

function PaymentMethod({ method }) {
  const id = method?.id || 1;
  const description = method?.description || 'Efectivo';
  return (
    <Card style={{ marginHorizontal: 20, padding: 20 }}>
      <SeparatorWithText text="Método de pago" />
      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        <PaymentIcon id={id} />
        <CustomText style={{ marginLeft: 20 }}>{description}</CustomText>
      </View>
    </Card>
  );
}

PaymentMethod.propTypes = {
  method: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string
  })
};

export default PaymentMethod;

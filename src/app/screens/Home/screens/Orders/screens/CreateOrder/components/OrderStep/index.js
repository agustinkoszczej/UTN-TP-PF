import React, { Component } from 'react';
import { View } from 'react-native';
import CustomDropdown from '@components/CustomDropdown';
import CustomText from '@components/CustomText';
import { PAYMENT_METHODS } from '@constants/paymentMethods';

import { CREATE_ORDER_FIELDS } from '../../constants';

class OrderStep extends Component {
  paymentMethodSelector = method => method.text;

  handlePaymentMethodChange = method => {
    const { setFieldValue } = this.props;
    setFieldValue(CREATE_ORDER_FIELDS.PAYMENT_METHOD, method.text);
  };

  render() {
    const { values } = this.props;
    const paymentMethod = values[CREATE_ORDER_FIELDS.PAYMENT_METHOD];
    return (
      <View>
        <CustomText>Método de pago:</CustomText>
        <CustomDropdown
          closeOnOverlayPress
          items={PAYMENT_METHODS}
          itemNameSelector={this.paymentMethodSelector}
          selectedOption={paymentMethod}
          onSelectItem={this.handlePaymentMethodChange}
        />
        {/* <CustomDropdown closeOnOverlayPress /> */}
      </View>
    );
  }
}

export default OrderStep;

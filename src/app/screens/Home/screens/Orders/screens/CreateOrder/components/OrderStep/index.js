import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomDropdown from '@components/CustomDropdown';
import CustomText from '@components/CustomText';
import CustomTextInput from '@components/CustomTextInput';
import { PAYMENT_METHODS } from '@constants/paymentMethods';

import { CREATE_ORDER_FIELDS } from '../../constants';

import styles from './styles';

class OrderStep extends Component {
  [CREATE_ORDER_FIELDS.COMMENT] = React.createRef();

  handleAmountChange = () => {
    this[CREATE_ORDER_FIELDS.COMMENT].current.focus();
  };

  paymentMethodSelector = method => method.text;

  handlePaymentMethodChange = method => {
    const { setFieldValue } = this.props;
    setFieldValue(CREATE_ORDER_FIELDS.PAYMENT_METHOD, method.text);
  };

  render() {
    const { values, handleSubmit } = this.props;
    const paymentMethod = values[CREATE_ORDER_FIELDS.PAYMENT_METHOD];
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    return (
      <View style={styles.container}>
        <View>
          <CustomText>Método de pago:</CustomText>
          <CustomDropdown
            closeOnOverlayPress
            items={PAYMENT_METHODS}
            itemNameSelector={this.paymentMethodSelector}
            selectedOption={paymentMethod}
            onSelectItem={this.handlePaymentMethodChange}
            style={styles.paymentMethod}
          />
        </View>
        <CustomTextInput
          {...commonProps}
          keyboardType="phone-pad"
          name={CREATE_ORDER_FIELDS.AMOUNT}
          placeholder="Precio"
          textRef={this[CREATE_ORDER_FIELDS.AMOUNT]}
          onTextSubmitEditing={this.handleAmountChange}
          maxLength={9}
        />
        <CustomTextInput
          {...commonProps}
          name={CREATE_ORDER_FIELDS.COMPANY_NAME}
          placeholder="Comentario"
          onTextSubmitEditing={handleSubmit}
          maxLength={150}
          applyTrim
          returnKeyType="go"
        />
      </View>
    );
  }
}

OrderStep.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.AMOUNT]: PropTypes.number,
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PropTypes.string,
    [CREATE_ORDER_FIELDS.COMMENT]: PropTypes.string
  })
};

export default OrderStep;

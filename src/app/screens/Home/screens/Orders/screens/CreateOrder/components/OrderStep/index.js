import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomDropdown from '@components/CustomDropdown';
import CustomText from '@components/CustomText';
import CustomTextInput from '@components/CustomTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PAYMENT_METHODS } from '@constants/paymentMethods';
import { dateFormat } from '@utils/timeUtils';

import { CREATE_ORDER_FIELDS } from '../../constants';

import styles from './styles';

class OrderStep extends Component {
  state = { date: new Date() };

  [CREATE_ORDER_FIELDS.COMMENT] = React.createRef();

  handleAmountChange = () => {
    this[CREATE_ORDER_FIELDS.COMMENT].current.focus();
  };

  handleDateChange = (_, date) => {
    const { setFieldValue } = this.props;
    this.setState({ date });
    setFieldValue(CREATE_ORDER_FIELDS.DELIVERY_DATE, dateFormat(date));
  };

  paymentMethodSelector = method => method.text;

  handlePaymentMethodChange = method => {
    const { setFieldValue } = this.props;
    setFieldValue(CREATE_ORDER_FIELDS.PAYMENT_METHOD, method.text);
  };

  render() {
    const { values } = this.props;
    const { date } = this.state;
    const paymentMethod = values[CREATE_ORDER_FIELDS.PAYMENT_METHOD];
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    return (
      <View style={styles.container}>
        <CustomTextInput
          {...commonProps}
          keyboardType="phone-pad"
          name={CREATE_ORDER_FIELDS.AMOUNT}
          placeholder="Precio"
          onTextSubmitEditing={this.handleAmountChange}
          maxLength={9}
        />
        <CustomTextInput
          {...commonProps}
          name={CREATE_ORDER_FIELDS.COMPANY_NAME}
          textRef={this[CREATE_ORDER_FIELDS.COMMENT]}
          placeholder="Comentario"
          maxLength={150}
          applyTrim
        />
        <CustomText>Fecha de entrega:</CustomText>
        <DateTimePicker
          value={date}
          minimumDate={new Date()}
          mode="date"
          display="default"
          onChange={this.handleDateChange}
        />
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
      </View>
    );
  }
}

OrderStep.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.AMOUNT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PropTypes.string,
    [CREATE_ORDER_FIELDS.COMMENT]: PropTypes.string
  })
};

export default OrderStep;

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CustomDropdown from '@components/CustomDropdown';
import CustomText from '@components/CustomText';
import TextInput, { FormField as CustomTextInput } from '@components/CustomTextInput';
import { PAYMENT_METHODS } from '@constants/paymentMethods';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isIos } from '@constants/platform';
import Calendar from '@components/Calendar';

import { CREATE_ORDER_FIELDS } from '../../constants';

import styles from './styles';

class OrderStep extends Component {
  [CREATE_ORDER_FIELDS.COMMENT] = React.createRef();

  handleAmountChange = () => {
    this[CREATE_ORDER_FIELDS.COMMENT].current.focus();
  };

  render() {
    const {
      values,
      hideOrShowCalendar,
      show,
      handlePaymentMethodChange,
      paymentMethodSelector,
      handleDateChange,
      date
    } = this.props;
    const paymentMethod = PAYMENT_METHODS[values[CREATE_ORDER_FIELDS.PAYMENT_METHOD] - 1].text;
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    return (
      <TouchableWithoutFeedback {...(isIos && { onPress: hideOrShowCalendar(false) })}>
        <ScrollView style={styles.container}>
          <CustomText>Comentario:</CustomText>
          <CustomTextInput
            name={CREATE_ORDER_FIELDS.COMMENT}
            {...commonProps}
            textRef={this[CREATE_ORDER_FIELDS.COMMENT]}
            placeholder="Comentario"
            maxLength={150}
            applyTrim
          />
          <TouchableOpacity style={styles.inputDateBirthday} onPress={hideOrShowCalendar(true)}>
            <View pointerEvents="none">
              <CustomText>Fecha de entrega:</CustomText>
              <TextInput {...commonProps} value={date} />
            </View>
          </TouchableOpacity>
          <Calendar
            value={values[CREATE_ORDER_FIELDS.DELIVERY_DATE]}
            show={show}
            updateDate={handleDateChange}
          />
          <CustomText>Método de pago:</CustomText>
          <CustomDropdown
            closeOnOverlayPress
            items={PAYMENT_METHODS}
            itemNameSelector={paymentMethodSelector}
            selectedOption={paymentMethod}
            onSelectItem={handlePaymentMethodChange}
            style={styles.paymentMethod}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

OrderStep.propTypes = {
  show: PropTypes.bool.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  hideOrShowCalendar: PropTypes.func.isRequired,
  handlePaymentMethodChange: PropTypes.func.isRequired,
  paymentMethodSelector: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.COMMENT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.AMOUNT]: PropTypes.number,
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PropTypes.number,
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: PropTypes.instanceOf(Date)
  }).isRequired
};

export default OrderStep;

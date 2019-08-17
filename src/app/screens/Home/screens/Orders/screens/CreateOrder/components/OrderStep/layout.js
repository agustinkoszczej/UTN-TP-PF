import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import CustomDropdown from '@components/CustomDropdown';
import Collapsible from '@components/Collapsible';
import CustomText from '@components/CustomText';
import CustomTextInput from '@components/CustomTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PAYMENT_METHODS } from '@constants/paymentMethods';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      date,
      show,
      handlePaymentMethodChange,
      paymentMethodSelector
    } = this.props;
    const paymentMethod = values[CREATE_ORDER_FIELDS.PAYMENT_METHOD];
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    return (
      <TouchableWithoutFeedback onPress={hideOrShowCalendar(false)}>
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
            name={CREATE_ORDER_FIELDS.COMMENT}
            textRef={this[CREATE_ORDER_FIELDS.COMMENT]}
            placeholder="Comentario"
            maxLength={150}
            applyTrim
          />
          <TouchableOpacity style={styles.inputDateBirthday} onPress={hideOrShowCalendar(true)}>
            <View pointerEvents="none">
              <CustomTextInput {...commonProps} value={date} placeholder="Fecha de entrega" />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={!show}>
            <DateTimePicker
              value={values[CREATE_ORDER_FIELDS.DELIVERY_DATE]}
              minimumDate={new Date()}
              mode="date"
              display="default"
              onChange={this.handleDateChange}
            />
          </Collapsible>
          <View>
            <CustomText>Método de pago:</CustomText>
            <CustomDropdown
              closeOnOverlayPress
              items={PAYMENT_METHODS}
              itemNameSelector={paymentMethodSelector}
              selectedOption={paymentMethod}
              onSelectItem={handlePaymentMethodChange}
              style={styles.paymentMethod}
            />
          </View>
        </View>
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
    [CREATE_ORDER_FIELDS.AMOUNT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PropTypes.string,
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: PropTypes.instanceOf(Date)
  }).isRequired
};

export default OrderStep;

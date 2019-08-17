import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import CustomDropdown from '@components/CustomDropdown';
import Collapsible from '@components/Collapsible';
import CustomText from '@components/CustomText';
import CustomTextInput from '@components/CustomTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PAYMENT_METHODS } from '@constants/paymentMethods';
import { dateFormat } from '@utils/timeUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CREATE_ORDER_FIELDS } from '../../constants';

import styles from './styles';

class OrderStep extends Component {
  state = {
    date: dateFormat(this.props.values[CREATE_ORDER_FIELDS.DELIVERY_DATE]),
    show: false
  };

  [CREATE_ORDER_FIELDS.COMMENT] = React.createRef();

  handleAmountChange = () => {
    this[CREATE_ORDER_FIELDS.COMMENT].current.focus();
  };

  handleDateChange = (_, date) => {
    const { setFieldValue } = this.props;
    this.setState({ date: dateFormat(date) });
    setFieldValue(CREATE_ORDER_FIELDS.DELIVERY_DATE, date);
  };

  hideOrShowCalendar = show => () => this.setState({ show });

  paymentMethodSelector = method => method.text;

  handlePaymentMethodChange = method => {
    const { setFieldValue } = this.props;
    setFieldValue(CREATE_ORDER_FIELDS.PAYMENT_METHOD, method.text);
  };

  render() {
    const { values } = this.props;
    const { date, show } = this.state;
    const paymentMethod = values[CREATE_ORDER_FIELDS.PAYMENT_METHOD];
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    return (
      <TouchableWithoutFeedback onPress={this.hideOrShowCalendar(false)}>
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
          <TouchableOpacity style={styles.inputDateBirthday} onPress={this.hideOrShowCalendar(true)}>
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
              itemNameSelector={this.paymentMethodSelector}
              selectedOption={paymentMethod}
              onSelectItem={this.handlePaymentMethodChange}
              style={styles.paymentMethod}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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

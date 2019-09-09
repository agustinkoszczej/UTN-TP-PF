import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import Collapsible from '@components/Collapsible';
import TextInput from '@components/CustomTextInput';

import { CREATE_AUCTIONS_FIELDS } from '../../constants';

import styles from './styles';

class AuctionStep extends Component {
  render() {
    const {
      handlePaymentSelect,
      hideOrShowCalendar,
      show,
      date,
      values,
      handleDateChange,
      isSelected
    } = this.props;
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    const isCashSelected = isSelected(1);
    const isMercadoPagoSelected = isSelected(2);

    return (
      <TouchableWithoutFeedback onPress={hideOrShowCalendar(false)}>
        <View style={styles.container}>
          <CustomText>Métodos de pago:</CustomText>
          <View style={styles.row}>
            <CustomButton
              style={[styles.paymentButton, isCashSelected && styles.selected]}
              secondaryBtn
              title="Efectivo"
              onPress={handlePaymentSelect(1)}
            />
            <CustomButton
              style={[styles.paymentButton, isMercadoPagoSelected && styles.selected]}
              secondaryBtn
              title="Mercado Pago"
              onPress={handlePaymentSelect(2)}
            />
          </View>
          <TouchableOpacity onPress={hideOrShowCalendar(true)}>
            <View pointerEvents="none">
              <CustomText>Fecha de entrega:</CustomText>
              <TextInput {...commonProps} value={date} />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={!show}>
            {show && (
              <DateTimePicker
                value={values[CREATE_AUCTIONS_FIELDS.DELIVERY_DATE]}
                minimumDate={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </Collapsible>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AuctionStep.propTypes = {
  handlePaymentSelect: PropTypes.func.isRequired,
  hideOrShowCalendar: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  values: PropTypes.shape({})
};

export default AuctionStep;

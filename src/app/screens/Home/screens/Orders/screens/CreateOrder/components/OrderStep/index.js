import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from '@utils/timeUtils';
import { isIos } from '@constants/platform';

import { CREATE_ORDER_FIELDS } from '../../constants';

import OrderStep from './layout';

class OrderStepContainer extends Component {
  state = {
    date: dateFormat(this.props.values[CREATE_ORDER_FIELDS.DELIVERY_DATE]),
    show: false
  };

  handleDateChange = (_, date) => {
    const { setFieldValue } = this.props;
    let changed = false;
    if (date) {
      isIos? this.setState({ date: dateFormat(date)}) : this.setState({ date: dateFormat(date), show: false });
      setFieldValue(CREATE_ORDER_FIELDS.DELIVERY_DATE, date);
      changed = true;
    }
    if (!isIos && !changed) this.setState({ show: false });
  };

  hideOrShowCalendar = show => () => {
    this.setState({ show });
  };

  paymentMethodSelector = method => method.text;

  handlePaymentMethodChange = method => {
    const { setFieldValue } = this.props;
    setFieldValue(CREATE_ORDER_FIELDS.PAYMENT_METHOD, method.id);
  };

  render() {
    const { values } = this.props;
    const { date, show } = this.state;
    return (
      <OrderStep
        date={date}
        values={values}
        show={show}
        hideOrShowCalendar={this.hideOrShowCalendar}
        handleDateChange={this.handleDateChange}
        handlePaymentMethodChange={this.handlePaymentMethodChange}
        paymentMethodSelector={this.paymentMethodSelector}
      />
    );
  }
}

OrderStepContainer.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.AMOUNT]: PropTypes.number,
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PropTypes.number,
    [CREATE_ORDER_FIELDS.COMMENT]: PropTypes.string,
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: PropTypes.instanceOf(Date)
  })
};

export default OrderStepContainer;

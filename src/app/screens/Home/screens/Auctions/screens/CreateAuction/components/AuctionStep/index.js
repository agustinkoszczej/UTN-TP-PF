import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from '@utils/timeUtils';

import { CREATE_AUCTIONS_FIELDS } from '../../constants';

import AuctionStep from './layout';

class AuctionStepContainer extends Component {
  state = {
    date: dateFormat(this.props.values[CREATE_AUCTIONS_FIELDS.DELIVERY_DATE]),
    show: false
  };

  handlePaymentSelect = id => () => {
    const { setFieldValue, values } = this.props;
    let methods;
    if (this.isSelected(id)) {
      methods = values[CREATE_AUCTIONS_FIELDS.PAYMENT_METHODS].filter(paymentId => paymentId.id !== id);
    } else {
      methods = values[CREATE_AUCTIONS_FIELDS.PAYMENT_METHODS];
      methods.push({ id });
    }
    setFieldValue(CREATE_AUCTIONS_FIELDS.PAYMENT_METHODS, methods);
  };

  hideOrShowCalendar = show => () => this.setState({ show });

  sharedSelector = method => method.text;

  handleSharedChange = method => {
    const { setFieldValue } = this.props;
    setFieldValue(CREATE_AUCTIONS_FIELDS.SHARED, !!method.id);
  };

  handleDateChange = (_, date) => {
    const { setFieldValue } = this.props;
    this.setState({ date: dateFormat(date) });
    setFieldValue(CREATE_AUCTIONS_FIELDS.DELIVERY_DATE, date);
  };

  isSelected = id =>
    this.props.values[CREATE_AUCTIONS_FIELDS.PAYMENT_METHODS].find(paymentId => paymentId.id === id);

  render() {
    const { date, show } = this.state;
    const { values } = this.props;
    return (
      <AuctionStep
        handlePaymentSelect={this.handlePaymentSelect}
        date={date}
        show={show}
        sharedSelector={this.sharedSelector}
        handleSharedChange={this.handleSharedChange}
        values={values}
        handleDateChange={this.handleDateChange}
        hideOrShowCalendar={this.hideOrShowCalendar}
        isSelected={this.isSelected}
      />
    );
  }
}

AuctionStepContainer.propTypes = {
  values: PropTypes.shape({
    [CREATE_AUCTIONS_FIELDS.DELIVERY_DATE]: PropTypes.instanceOf(Date)
  }),
  setFieldValue: PropTypes.func.isRequired
};

export default AuctionStepContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { PAYMENT_METHODS } from '@constants/paymentMethods';

import CreateOrder from './layout';
import { CREATE_ORDER_FIELDS } from './constants';

class CreateOrderContainer extends Component {
  state = { currentStep: 0 };

  initialValues = {
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS[0].text,
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: new Date(),
    [CREATE_ORDER_FIELDS.COMMENT]: '',
    [CREATE_ORDER_FIELDS.AMOUNT]: ''
  };

  handleNext = () => this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));

  handleCreateOrder = values => {
    const { createOrder } = this.props;
    createOrder(values);
  };

  render() {
    const { currentStep } = this.state;
    return (
      <CreateOrder
        currentStep={currentStep}
        onCreateOrder={this.handleCreateOrder}
        onNext={this.handleNext}
        initialValues={this.initialValues}
      />
    );
  }
}

CreateOrderContainer.propTypes = {
  createOrder: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  createOrder: values => dispatch(OrdersActions.createOrder(values))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateOrderContainer);

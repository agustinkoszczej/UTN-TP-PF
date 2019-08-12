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
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS[0].text
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

const mapStateToProps = state => ({
  orders: state.orders.pastOrders.orders
});

const mapDispatchToProps = dispatch => ({
  createOrder: values => dispatch(OrdersActions.createOrder(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateOrderContainer);

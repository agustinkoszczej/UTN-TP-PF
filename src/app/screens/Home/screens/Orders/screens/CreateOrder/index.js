import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';

import CreateOrder from './layout';

class CreateOrderContainer extends Component {
  state = { currentStep: 0 };

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

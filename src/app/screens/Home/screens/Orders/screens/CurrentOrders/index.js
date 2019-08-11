import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { ordersModel } from '@propTypes/ordersModel';

import OrdersList from '../../components/OrdersList';

class CurrentOrdersContainer extends Component {
  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    const { getCurrentOrders } = this.props;
    getCurrentOrders();
  };

  render() {
    const { orders, error, loading } = this.props;
    return <OrdersList orders={orders} error={error} loading={loading} getOrders={this.getOrders} />;
  }
}

const mapStateToProps = state => ({
  orders: state.orders.currentOrders.orders,
  error: state.orders.currentOrdersError,
  loading: state.orders.currentOrdersLoading
});

const mapDispatchToProps = dispatch => ({
  getCurrentOrders: () => dispatch(OrdersActions.getCurrentOrders())
});

CurrentOrdersContainer.propTypes = {
  getCurrentOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  orders: PropTypes.arrayOf(PropTypes.shape(ordersModel))
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(CurrentOrdersContainer);

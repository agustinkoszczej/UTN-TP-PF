import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { ordersModel } from '@propTypes/ordersModel';

import OrdersList from '../../components/OrdersList';

class ActiveOrdersContainer extends Component {
  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    const { getActiveOrders } = this.props;
    getActiveOrders();
  };

  render() {
    const { orders, error, loading } = this.props;
    return <OrdersList orders={orders} error={error} loading={loading} getOrders={this.getOrders} active />;
  }
}

const mapStateToProps = state => ({
  orders: state.orders.activeOrders.orders,
  error: state.orders.activeOrdersError,
  loading: state.orders.activeOrdersLoading
});

const mapDispatchToProps = dispatch => ({
  getActiveOrders: () => dispatch(OrdersActions.getActiveOrders())
});

ActiveOrdersContainer.propTypes = {
  getActiveOrders: PropTypes.func.isRequired,
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

export default enhance(ActiveOrdersContainer);

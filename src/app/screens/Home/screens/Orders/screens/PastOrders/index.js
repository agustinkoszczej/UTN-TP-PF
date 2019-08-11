import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { ordersModel } from '@propTypes/ordersModel';

import OrdersList from '../../components/OrdersList';

class PastOrdersContainer extends Component {
  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    const { getPastOrders } = this.props;
    getPastOrders();
  };

  render() {
    const { orders, error, loading } = this.props;
    return <OrdersList orders={orders} error={error} loading={loading} getOrders={this.getOrders} />;
  }
}

const mapStateToProps = state => ({
  orders: state.orders.pastOrders.orders,
  error: state.orders.pastOrdersError,
  loading: state.orders.pastOrdersLoading
});

const mapDispatchToProps = dispatch => ({
  getPastOrders: () => dispatch(OrdersActions.getPastOrders())
});

PastOrdersContainer.propTypes = {
  getPastOrders: PropTypes.func.isRequired,
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

export default enhance(PastOrdersContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { ordersModel } from '@propTypes/ordersModel';

import OrdersList from '../../components/OrdersList';

class ActiveOrdersContainer extends Component {
  state = { currentPage: 1 };

  componentDidMount() {
    this.onRefresh();
  }

  getOrders = () => {
    const { getActiveOrders, pages } = this.props;
    const { currentPage } = this.state;
    if (currentPage !== pages) {
      getActiveOrders(currentPage + 1);
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    }
  };

  onRefresh = () => {
    const { refreshActiveOrders } = this.props;
    this.setState({ currentPage: 1 });
    refreshActiveOrders();
  };

  render() {
    const { orders, error, loading } = this.props;
    return (
      <OrdersList
        orders={orders}
        error={error}
        loading={loading}
        onRefresh={this.onRefresh}
        getOrders={this.getOrders}
        active
      />
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.activeOrders?.orders,
  pages: state.orders.activeOrders?.pages,
  error: state.orders.activeOrdersError,
  loading: state.orders.activeOrdersLoading
});

const mapDispatchToProps = dispatch => ({
  getActiveOrders: page => dispatch(OrdersActions.getActiveOrders(page)),
  refreshActiveOrders: () => dispatch(OrdersActions.refreshActiveOrders())
});

ActiveOrdersContainer.propTypes = {
  getActiveOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  orders: PropTypes.arrayOf(PropTypes.shape(ordersModel)),
  pages: PropTypes.number,
  refreshActiveOrders: PropTypes.func.isRequired
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(ActiveOrdersContainer);

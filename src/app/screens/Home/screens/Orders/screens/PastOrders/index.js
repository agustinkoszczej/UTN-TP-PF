import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { ordersModel } from '@propTypes/ordersModel';

import OrdersList from '../../components/OrdersList';

class PastOrdersContainer extends Component {
  state = { currentPage: 1 };

  componentDidMount() {
    this.onRefresh();
  }

  getOrders = () => {
    const { getPastOrders, pages } = this.props;
    const { currentPage } = this.state;
    if (currentPage !== pages) {
      getPastOrders(currentPage + 1);
      this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    }
  };

  onRefresh = () => {
    const { refreshPastOrders } = this.props;
    this.setState({ currentPage: 1 });
    refreshPastOrders();
  };

  render() {
    const { orders, error, loading } = this.props;
    return (
      <OrdersList
        orders={orders}
        onRefresh={this.onRefresh}
        error={error}
        loading={loading}
        getOrders={this.getOrders}
      />
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders.pastOrders?.orders,
  pages: state.orders.pastOrders?.pages,
  error: state.orders.pastOrdersError,
  loading: state.orders.pastOrdersLoading
});

const mapDispatchToProps = dispatch => ({
  getPastOrders: page => dispatch(OrdersActions.getPastOrders(page)),
  refreshPastOrders: () => dispatch(OrdersActions.refreshPastOrders())
});

PastOrdersContainer.propTypes = {
  getPastOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  orders: PropTypes.arrayOf(PropTypes.shape(ordersModel)),
  pages: PropTypes.number,
  refreshPastOrders: PropTypes.func.isRequired
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(PastOrdersContainer);

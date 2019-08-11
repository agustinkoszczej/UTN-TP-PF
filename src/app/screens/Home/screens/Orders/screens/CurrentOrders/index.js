import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { ordersModel } from '@propTypes/ordersModel';

import CurrentOrders from './layout';

class CurrentOrdersContainer extends Component {
  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    const { getCurrentOrders } = this.props;
    getCurrentOrders();
  };

  render() {
    const { currentOrders, error, loading } = this.props;
    return (
      <CurrentOrders
        currentOrders={currentOrders}
        error={error}
        loading={loading}
        getOrders={this.getOrders}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentOrders: state.orders.currentOrders.orders,
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
  currentOrders: PropTypes.arrayOf(PropTypes.shape(ordersModel))
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(CurrentOrdersContainer);

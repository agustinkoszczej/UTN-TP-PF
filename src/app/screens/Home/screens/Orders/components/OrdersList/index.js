import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import worried from '@assets/worried.png';
import WithError from '@components/WithError';
import { ordersModel } from '@propTypes/ordersModel';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';
import OrdersActions from '@redux/orders/actions';

import styles from './styles';
import OrderView from './components/OrderView';

class OrdersList extends Component {
  renderItem = ({ item }) => <OrderView order={item} goToOrderDetail={this.goToOrderDetail} />;

  goToOrderDetail = id => () => {
    const {
      navigation: { navigate },
      getOrderById
    } = this.props;
    navigate(Routes.OrderDetail, { id });
    getOrderById(id);
  };

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { orders, getOrders, loading, onRefresh } = this.props;
    return (
      <FlatList
        data={orders}
        style={styles.container}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onRefresh={onRefresh}
        refreshing={loading}
        // onEndReached={getOrders}
      />
    );
  }
}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(ordersModel)),
  getOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired,
  getOrderById: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getOrderById: id => dispatch(OrdersActions.getOrderById(id))
});

const enhance = compose(
  withNavigation,
  connect(
    null,
    mapDispatchToProps
  ),
  WithError(
    ({ error, orders }) => error || orders?.length === 0,
    ({ orders, loading, getOrders, error, active }) => ({
      asset: orders?.length === 0 ? worried : undefined,
      handleError: error && getOrders,
      title:
        orders?.length === 0 ? (active ? 'No tenes pedidos activos' : 'No tenes pedidos pasados') : undefined,
      loading
    })
  )
);

export default enhance(OrdersList);

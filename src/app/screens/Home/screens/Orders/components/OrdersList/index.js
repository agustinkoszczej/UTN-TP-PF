import React, { Component } from 'react';
import { FlatList, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import worried from '@assets/worried.png';
import { compose } from 'recompose';
import Loadable from '@components/Loadable';
import WithError from '@components/WithError';
import { ordersModel } from '@propTypes/ordersModel';
import CustomText from '@components/CustomText';

import styles from './styles';

class OrdersList extends Component {
  renderItem = ({ item: { receiverName, receiverPicture } }) => (
    <View style={styles.orderContainer}>
      <Image source={{ uri: receiverPicture }} style={styles.userPicture} />
      <CustomText>{receiverName}</CustomText>
    </View>
  );

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { orders } = this.props;
    return <FlatList data={orders} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />;
  }
}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(ordersModel))
};

const enhance = compose(
  WithError(
    ({ error, orders }) => error || orders?.length === 0,
    ({ orders, loading, getOrders, error, active }) => ({
      asset: orders?.length === 0 ? worried : undefined,
      handleError: error && getOrders,
      title:
        orders?.length === 0 ? (active ? 'No tenes pedidos activos' : 'No tenes pedidos pasados') : undefined,
      loading
    })
  ),
  Loadable(props => props.loading, true)
);

export default enhance(OrdersList);

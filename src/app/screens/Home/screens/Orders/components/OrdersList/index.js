import React, { Component } from 'react';
import { FlatList, Image } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import worried from '@assets/worried.png';
import WithError from '@components/WithError';
import { ordersModel } from '@propTypes/ordersModel';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';

import styles from './styles';

class OrdersList extends Component {
  renderItem = ({ item: { receiverName, receiverPicture, amount, id } }) => (
    <Card style={styles.orderContainer}>
      <Image source={{ uri: receiverPicture }} style={styles.userPicture} />
      <CustomText>{receiverName}</CustomText>
      <CustomText>{amount}</CustomText>
      <CustomButton
        primaryBtn
        style={styles.seeButton}
        textStyle={styles.white}
        onPress={this.goToOrderDetail(id)}
        title="Ver"
      />
    </Card>
  );

  goToOrderDetail = id => () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate(Routes.OrderDetail, { id });
  };

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { orders, getOrders, loading } = this.props;
    return (
      <FlatList
        data={orders}
        style={styles.container}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onRefresh={getOrders}
        refreshing={loading}
      />
    );
  }
}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(ordersModel)),
  getOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired
};

const enhance = compose(
  withNavigation,
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

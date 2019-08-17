import React, { Component } from 'react';
import { FlatList, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import worried from '@assets/worried.png';
import WithError from '@components/WithError';
import { ordersModel } from '@propTypes/ordersModel';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import StatusTag from '@components/StatusTag';
import Card from '@components/Card';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';
import { dateFormat } from '@utils/timeUtils';
import OrdersActions from '@redux/orders/actions';

import styles from './styles';

class OrdersList extends Component {
  renderItem = ({ item: { receiverName, receiverPicture, amount, id, status, deliveryDate } }) => (
    <Card style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <View style={styles.orderName}>
          <Image source={{ uri: receiverPicture }} style={styles.userPicture} />
          <CustomText style={styles.name} title bold>
            {receiverName}
          </CustomText>
        </View>
        <StatusTag status={status} />
      </View>
      <View style={styles.bottomOrder}>
        <View>
          <CustomText>{`Precio: ${amount}`}</CustomText>
          <CustomText>{`Fecha de entrega: ${dateFormat(deliveryDate)}`}</CustomText>
        </View>
        <CustomButton
          primaryBtn
          style={styles.seeButton}
          textStyle={styles.white}
          onPress={this.goToOrderDetail(id)}
          title="Ver"
        />
      </View>
    </Card>
  );

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

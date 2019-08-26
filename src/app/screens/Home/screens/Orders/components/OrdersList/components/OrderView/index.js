import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import StatusTag from '@components/StatusTag';
import Card from '@components/Card';
import { dateFormat } from '@utils/timeUtils';
import { formatMoney } from '@utils/numberUtils';
import { ordersModel } from '@propTypes/ordersModel';

import styles from '../../styles';

class OrderView extends Component {
  render() {
    const {
      order: { receiverName, receiverPicture, amount, id, status, deliveryDate },
      goToOrderDetail
    } = this.props;
    return (
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
            <CustomText>{`Precio: ${formatMoney(amount)}`}</CustomText>
            <CustomText>{`Fecha de entrega: ${dateFormat(deliveryDate)}`}</CustomText>
          </View>
          <CustomButton
            primaryBtn
            style={styles.seeButton}
            textStyle={styles.white}
            onPress={goToOrderDetail(id)}
            title="Ver"
          />
        </View>
      </Card>
    );
  }
}

OrderView.propTypes = {
  goToOrderDetail: PropTypes.func.isRequired,
  order: PropTypes.shape(ordersModel).isRequired
};

export default OrderView;

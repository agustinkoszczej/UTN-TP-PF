import React, { Component } from 'react';
import { Image, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import Collapsible from '@components/Collapsible';
import SeparatorWithText from '@components/SeparatorWithText';
import { dateFormat } from '@utils/timeUtils';
import { formatMoney } from '@utils/numberUtils';
import arrowUp from '@assets/ic_angle_up_grey.png';
import arrowDown from '@assets/ic_angle_down_grey.png';

import styles from '../../styles';

class OrderView extends Component {
  state = { collapsed: true };

  handleToogle = () => this.setState(prevState => ({ collapsed: !prevState.collapsed }));

  renderItem = ({
    item: {
      quantity,
      product: { description }
    }
  }) => (
    <View style={styles.productContainer}>
      <CustomText>{description}</CustomText>
      <CustomText>{quantity}</CustomText>
    </View>
  );

  renderSeparator = () => <SeparatorWithText text="Productos" />;

  render() {
    const {
      order: {
        deliveryDate,
        products = [],
        id,
        amount,
        receiverName,
        supplier: { picture }
      },
      goToOrderDetail
    } = this.props;
    const { collapsed } = this.state;
    return (
      <Card style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <View style={styles.orderName}>
            <Image source={{ uri: picture }} style={styles.userPicture} />
            <CustomText style={styles.name} title bold>
              {receiverName}
            </CustomText>
          </View>
        </View>
        <SeparatorWithText text="Detalle" />
        <View style={styles.bottomOrder}>
          <View>
            <CustomText style={{ marginBottom: 10 }}>{`Entrega: ${dateFormat(deliveryDate)}`}</CustomText>
            <CustomText>{`Precio: ${formatMoney(amount)}`}</CustomText>
          </View>
          <CustomButton onPress={this.handleToogle} icon={collapsed ? arrowDown : arrowUp} />
        </View>
        <View>
          <Collapsible collapsed={collapsed}>
            <FlatList
              data={products}
              renderItem={this.renderItem}
              ListHeaderComponent={this.renderSeparator}
              ListHeaderComponentStyle={{ marginBottom: 5 }}
              ListFooterComponent={
                <CustomButton
                  primaryBtn
                  style={styles.seeButton}
                  textStyle={styles.white}
                  onPress={goToOrderDetail(id)}
                  title="Ver"
                />
              }
            />
          </Collapsible>
        </View>
      </Card>
    );
  }
}

OrderView.propTypes = {
  goToOrderDetail: PropTypes.func.isRequired,
  order: PropTypes.shape({
    deliveryDate: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({})),
    id: PropTypes.number,
    amount: PropTypes.number,
    supplier: PropTypes.shape({
      picture: PropTypes.string
    }),
    receiverName: PropTypes.string
  }).isRequired
};

export default OrderView;

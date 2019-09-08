import React, { Component } from 'react';
import { Image, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import Collapsible from '@components/Collapsible';
import SeparatorWithText from '@components/SeparatorWithText';
import { userModel } from '@propTypes/userModel';
import { dateFormat } from '@utils/timeUtils';
import arrowUp from '@assets/ic_angle_up_grey.png';
import arrowDown from '@assets/ic_angle_down_grey.png';

import styles from '../../styles';

class AuctionView extends Component {
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

  renderSeparator = () => <SeparatorWithText text="Productos" style={{ marginBottom: 35 }} />;

  render() {
    const {
      auction: { deliveryDate, expirationDate, auctionProducts },
      goToAuctionDetail,
      user: { picture, fullName, id }
    } = this.props;
    const { collapsed } = this.state;
    return (
      <Card style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          <View style={styles.orderName}>
            <Image source={{ uri: picture }} style={styles.userPicture} />
            <CustomText style={styles.name} title bold>
              {fullName}
            </CustomText>
          </View>
        </View>
        <SeparatorWithText text="Detalle" />
        <View style={styles.bottomOrder}>
          <View>
            <CustomText style={{ marginBottom: 10 }}>{`Entrega: ${dateFormat(deliveryDate)}`}</CustomText>
            <CustomText>{`Expiración: ${dateFormat(expirationDate)}`}</CustomText>
          </View>
          <CustomButton onPress={this.handleToogle} icon={collapsed ? arrowDown : arrowUp} />
        </View>
        <View>
          <Collapsible collapsed={collapsed}>
            <FlatList
              data={auctionProducts}
              renderItem={this.renderItem}
              ListHeaderComponent={this.renderSeparator}
              ListHeaderComponentStyle={{ marginBottom: 5 }}
              ListFooterComponent={
                <CustomButton
                  primaryBtn
                  style={styles.seeButton}
                  textStyle={styles.white}
                  onPress={goToAuctionDetail(id)}
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

AuctionView.propTypes = {
  goToAuctionDetail: PropTypes.func.isRequired,
  auction: PropTypes.shape({
    deliveryDate: PropTypes.string,
    expirationDate: PropTypes.string,
    auctionProducts: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  user: PropTypes.shape(userModel).isRequired
};

export default AuctionView;

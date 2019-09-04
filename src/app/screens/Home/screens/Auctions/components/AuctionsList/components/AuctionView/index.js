import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import StatusTag from '@components/StatusTag';
import Card from '@components/Card';
import Collapsible from '@components/Collapsible';
import { dateFormat } from '@utils/timeUtils';
import arrowUp from '@assets/ic_angle_up_grey.png';
import arrowDown from '@assets/ic_angle_down_grey.png';

import styles from '../../styles';

class AuctionView extends Component {
  state = { collapsed: true };

  handleToogle = () => this.setState(prevState => ({ collapsed: !prevState.collapsed }));

  render() {
    const { auction, goToOrderDetail } = this.props;
    const { collapsed } = this.state;
    return (
      <Card style={styles.orderContainer}>
        <View style={styles.orderHeader}>
          {/* <View style={styles.orderName}>
            <Image source={{ uri: receiverPicture }} style={styles.userPicture} />
            <CustomText style={styles.name} title bold>
              {receiverName}
            </CustomText>
          </View>
          <StatusTag status={status} /> */}
        </View>
        <View style={styles.bottomOrder}>
          <View>
            <CustomText>Precio: </CustomText>
            <CustomText>Eentrega: </CustomText>
          </View>
          <CustomButton onPress={this.handleToogle} icon={collapsed ? arrowDown : arrowUp} />
        </View>
        <View>
          <Collapsible collapsed={collapsed}>
            <CustomButton
              primaryBtn
              style={styles.seeButton}
              textStyle={styles.white}
              //   onPress={goToOrderDetail(id)}
              title="Ver"
            />
          </Collapsible>
        </View>
      </Card>
    );
  }
}

AuctionView.propTypes = {
  goToOrderDetail: PropTypes.func.isRequired,
  order: PropTypes.shape({}).isRequired
};

export default AuctionView;

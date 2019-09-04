import React, { Component } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import Collapsible from '@components/Collapsible';
import { userModel } from '@propTypes/userModel';
import { dateFormat } from '@utils/timeUtils';
import arrowUp from '@assets/ic_angle_up_grey.png';
import arrowDown from '@assets/ic_angle_down_grey.png';

import styles from '../../styles';

class AuctionView extends Component {
  state = { collapsed: true };

  handleToogle = () => this.setState(prevState => ({ collapsed: !prevState.collapsed }));

  render() {
    const {
      auction: { deliveryDate },
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
        <View style={styles.bottomOrder}>
          <View>
            <CustomText>{`Entrega: ${dateFormat(deliveryDate)}`}</CustomText>
          </View>
          <CustomButton onPress={this.handleToogle} icon={collapsed ? arrowDown : arrowUp} />
        </View>
        <View>
          <Collapsible collapsed={collapsed}>
            <CustomButton
              primaryBtn
              style={styles.seeButton}
              textStyle={styles.white}
              onPress={goToAuctionDetail(id)}
              title="Ver"
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
    deliveryDate: PropTypes.string
  }).isRequired,
  user: PropTypes.shape(userModel).isRequired
};

export default AuctionView;

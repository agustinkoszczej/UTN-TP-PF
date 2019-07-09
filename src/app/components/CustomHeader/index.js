import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import Routes from '@constants/routes';
import CustomText from '@components/CustomText';
import storeIcon from '@assets/ic_local.png';
import deliveryIcon from '@assets/ic_delivery.png';
import angleDown from '@assets/ic_angle_down_grey.png';
import { isDelivery as checkDelivery } from '@constants/delivery';

import styles, { locationProps } from './styles';
import { strings } from './i18n';

class CustomHeader extends Component {
  handlePress = () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.navigate({ routeName: Routes.EditAddress }));
  };

  render() {
    const { isDelivery, deliveryType, location } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Image source={isDelivery ? deliveryIcon : storeIcon} style={styles.icon} resizeMode="contain" />
        <CustomText borderless style={styles.type}>
          {deliveryType}
        </CustomText>
        <CustomText borderless style={styles.location} textProps={locationProps}>
          {location}
        </CustomText>
        <Image source={angleDown} style={styles.angleDown} resizeMode="contain" />
      </TouchableOpacity>
    );
  }
}

CustomHeader.propTypes = {
  deliveryType: PropTypes.string,
  isDelivery: PropTypes.bool,
  location: PropTypes.string
};

const mapStateToProps = state => {
  const isDelivery = checkDelivery(state.delivery.deliveryType);
  return {
    isDelivery,
    deliveryType: isDelivery ? strings.DELIVERY() : strings.PICK_UP(),
    location: isDelivery ? state.auth.activeAddress?.textAddress : state.delivery.selectedStore.name
  };
};

export default connect(mapStateToProps)(CustomHeader);

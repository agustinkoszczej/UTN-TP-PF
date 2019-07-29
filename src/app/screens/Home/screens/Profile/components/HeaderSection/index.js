import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import { AirbnbRating } from 'react-native-ratings';
import { withNavigation } from 'react-navigation';
import iconAsset from '@lottieAssets/profile.json';
import { black } from '@constants/colors';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Routes from '@constants/routes';
import { navigationModel } from '@propTypes/navigationModel';
import { View } from 'react-native';

import { strings } from './constants';
import styles from './styles';

class HeaderSectionContainer extends Component {
  navigateToConfiguration = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate(Routes.Configuration);
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView autoPlay loop={false} source={iconAsset} style={styles.icon} />
        <CustomText bold style={styles.name}>
          Juan Perez S.A.
        </CustomText>
        <CustomButton
          secondaryBtn
          title={strings.edit}
          style={styles.button}
          onPress={this.navigateToConfiguration}
        />
        <AirbnbRating selectedColor={black} defaultRating={2.25} isDisabled style={{ paddingVertical: 10 }} />
      </View>
    );
  }
}

HeaderSectionContainer.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired
};

export default withNavigation(HeaderSectionContainer);

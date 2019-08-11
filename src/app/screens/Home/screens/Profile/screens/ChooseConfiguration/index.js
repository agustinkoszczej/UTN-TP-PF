import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import Routes from '@constants/routes';
import { navigationModel } from '@propTypes/navigationModel';

import background from '../../assets/background.jpg';
import { TYPES } from '../../constants';

import { strings } from './constants';
import styles from './styles';

class ChooseConfiguration extends Component {
  handleClick = type => () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate(Routes.Configuration, { type });
  };

  render() {
    return (
      <ImageBackground source={background} style={styles.container}>
        <CustomText bold style={styles.white}>
          {strings.choose}
        </CustomText>
        <CustomButton
          secondaryBtn
          title={strings.editUserData}
          style={styles.button}
          onPress={this.handleClick(TYPES.USER)}
        />
        <CustomButton
          secondaryBtn
          title={strings.editCompanyData}
          style={styles.button}
          onPress={this.handleClick(TYPES.COMPANY)}
        />
        <CustomButton
          secondaryBtn
          title={strings.editLocation}
          style={styles.button}
          onPress={this.handleClick(TYPES.LOCATION)}
        />
        <CustomButton
          secondaryBtn
          title={strings.editQR}
          style={styles.button}
          onPress={this.handleClick(TYPES.QR)}
        />
      </ImageBackground>
    );
  }
}

ChooseConfiguration.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired
};

export default withNavigation(ChooseConfiguration);

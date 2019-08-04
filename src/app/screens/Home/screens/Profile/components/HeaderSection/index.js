import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import { View } from 'react-native';
import AuthActions from '@redux/auth/actions';
import iconAsset from '@lottieAssets/profile.json';
import { black } from '@constants/colors';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Routes from '@constants/routes';
import { navigationModel } from '@propTypes/navigationModel';

import { strings } from './constants';
import styles from './styles';

class HeaderSectionContainer extends Component {
  navigateToConfiguration = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate(Routes.Configuration);
  };

  handleLogOut = () => {
    const { logOut } = this.props;
    logOut();
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView autoPlay loop={false} source={iconAsset} style={styles.icon} />
        <CustomText bold style={styles.name}>
          Juan Perez S.A.
        </CustomText>
        <CustomText style={styles.direction}>Medrano 851</CustomText>
        <AirbnbRating selectedColor={black} defaultRating={2.25} isDisabled />
        <CustomButton
          secondaryBtn
          title={strings.edit}
          style={styles.button}
          onPress={this.navigateToConfiguration}
        />
        <CustomButton title={strings.closeSession} style={styles.button} onPress={this.handleLogOut} />
      </View>
    );
  }
}

HeaderSectionContainer.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AuthActions.logOut())
});

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HeaderSectionContainer);

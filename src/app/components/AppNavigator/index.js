import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Navigator from '@app/screens';
import { statusBarStyles } from '@config/navigation';
import { ROOT } from '@constants/platform';
import { getCurrentRouteName } from '@utils/navUtils';

const AppWithNavigationState = reduxifyNavigator(Navigator, ROOT);

class AppNavigator extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, state } = this.props;
    if (state.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { state } = this.props;
    const currentRoute = getCurrentRouteName(state);
    const statusBarProps = statusBarStyles[currentRoute] || statusBarStyles.default;
    return (
      <>
        <StatusBar animated {...statusBarProps} />
        <AppWithNavigationState {...this.props} />
      </>
    );
  }
}

AppNavigator.propTypes = {
  state: PropTypes.shape({
    index: PropTypes.number.isRequired
  })
};

const mapStateToProps = state => ({ state: state.nav });

export default connect(mapStateToProps)(AppNavigator);

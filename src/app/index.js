import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavigator from '@components/AppNavigator';
import AuthActions from '@redux/auth/actions';
import configPushNotifications from '@config/PushNotifications';

import ConnectedDialog from './components/ConnectedDialog';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
    const { setUp, configNotifications } = this.props;
    setUp();
    configNotifications();
  }

  render() {
    return (
      <>
        <AppNavigator />
        <ConnectedDialog />
      </>
    );
  }
}

App.propTypes = {
  setUp: PropTypes.func.isRequired,
  configNotifications: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setUp: () => dispatch(AuthActions.setUp()),
  configNotifications: () => configPushNotifications(dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(App);

import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import AppNavigator from '@components/AppNavigator';
import AuthActions from '@redux/auth/actions';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
    const { setUp } = this.props
    setUp();
  }

  render() {
    return <AppNavigator />;
  }
}

const mapDispatchToProps = dispatch => ({
  setUp: () => dispatch(AuthActions.setUp())
});

export default connect(null, mapDispatchToProps)(App);

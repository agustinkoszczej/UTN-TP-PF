import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View, Text } from 'react-native';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (<View>
      <Text>
      Hola Fede
      </Text>
    </View>);
  }
}

// const MyAppWithOverlay = __DEV__ ? Reactotron.overlay(App) : App;

// export default connect()(MyAppWithOverlay);

export default App;

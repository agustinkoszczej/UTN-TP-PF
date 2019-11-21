import 'react-native-gesture-handler';
import { useScreens } from 'react-native-screens';
import React from 'react';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import App from './src/app';

useScreens();

export default function index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

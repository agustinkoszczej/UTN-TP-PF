import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import Routes from '@constants/routes';

import styles from './styles';
import userIconOn from './assets/ic_user_on.png';
import userIconOff from './assets/ic_user_off.png';

const tabIconsOn = {
  [Routes.Profile]: userIconOn
};

const tabIconsOff = {
  [Routes.Profile]: userIconOff
};

function TabBarIcon({ tintColor, route, focused }) {
  return (
    <Image
      source={focused ? tabIconsOn[route] : tabIconsOff[route]}
      resizeMode="stretch"
      style={[{ tintColor }, styles.tabIcon]}
    />
  );
}

TabBarIcon.propTypes = {
  route: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool
};

export default TabBarIcon;

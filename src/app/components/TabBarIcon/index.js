import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import Routes from '@constants/routes';

import styles from './styles';
import menuIconOn from './assets/ic_menu_on.png';
import pointsIconOn from './assets/ic_points_on.png';
import ordersIconOn from './assets/ic_orders_on.png';
import userIconOn from './assets/ic_user_on.png';
import menuIconOff from './assets/ic_menu_off.png';
import pointsIconOff from './assets/ic_points_off.png';
import ordersIconOff from './assets/ic_orders_off.png';
import userIconOff from './assets/ic_user_off.png';

const tabIconsOn = {
  [Routes.Menu]: menuIconOn,
  [Routes.Points]: pointsIconOn,
  [Routes.Orders]: ordersIconOn,
  [Routes.Profile]: userIconOn
};

const tabIconsOff = {
  [Routes.Menu]: menuIconOff,
  [Routes.Points]: pointsIconOff,
  [Routes.Orders]: ordersIconOff,
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

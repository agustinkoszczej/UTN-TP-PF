import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import Routes from '@constants/routes';

import styles from './styles';
import userIconOn from './assets/ic_user_on.png';
import userIconOff from './assets/ic_user_off.png';
import orderIconOff from './assets/ic_order_off.png';
import orderIconOn from './assets/ic_order_on.png';
import homeIconOff from './assets/ic_home_off.png';
import homeIconOn from './assets/ic_home_on.png';
import auctionIconOff from './assets/ic_auction_off.png';
import auctionIconOn from './assets/ic_auction_on.png';
import chatIconOff from './assets/ic_chat_off.png';
import chatIconOn from './assets/ic_chat_on.png';

const tabIconsOn = {
  [Routes.Profile]: userIconOn,
  [Routes.Auctions]: auctionIconOn,
  [Routes.HomeMenu]: homeIconOn,
  [Routes.Orders]: orderIconOn,
  [Routes.Chats]: chatIconOn
};

const tabIconsOff = {
  [Routes.Profile]: userIconOff,
  [Routes.Auctions]: auctionIconOff,
  [Routes.HomeMenu]: homeIconOff,
  [Routes.Orders]: orderIconOff,
  [Routes.Chats]: chatIconOff
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

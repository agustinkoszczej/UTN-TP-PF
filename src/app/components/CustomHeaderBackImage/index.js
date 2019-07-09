import React from 'react';
import { Image } from 'react-native';

import backIcon from './assets/ic_arrow_left.png';
import styles from './styles';

// TODO: Check if we need this component
function CustomHeaderBackImage() {
  return <Image source={backIcon} style={styles.icon} resizeMode="contain" />;
}

export default CustomHeaderBackImage;

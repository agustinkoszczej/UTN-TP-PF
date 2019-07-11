import React from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { changeColorOpacity, wildSand } from '@constants/colors';

import styles from './styles';

function BackgroundImage({ source, backgroundColor, style }) {
  return source ? (
    <>
      <FastImage source={source} style={[styles.backgroundImage, style]} />
      <LinearGradient
        colors={[changeColorOpacity(backgroundColor, 0), backgroundColor]}
        style={[styles.backgroundImage, style]}
      />
    </>
  ) : null;
}

BackgroundImage.defaultProps = {
  backgroundColor: wildSand
};

BackgroundImage.propTypes = {
  source: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default BackgroundImage;

import React from 'react';
import { View, Text } from 'react-native';
import CustomText from '@components/CustomText';
import PropTypes from 'prop-types';

import styles from './styles';

function SeparatorWithText({ text, style, textStyle, separatorStyle, small }) {
  return (
    <View style={[styles.container, style]}>
      {text && (
        <CustomText justify style={[styles.text, textStyle]} divider={!small} dividerSmall={small} borderless>
          {text}
        </CustomText>
      )}
      <View style={[text && styles.separatorWithText, styles.graySeparator, separatorStyle]} />
    </View>
  );
}

SeparatorWithText.defaultProps = {
  textStyle: {},
  small: false
};

SeparatorWithText.propTypes = {
  text: PropTypes.node,
  textStyle: Text.propTypes.style,
  separatorStyle: Text.propTypes.style,
  small: PropTypes.bool
};

export default SeparatorWithText;

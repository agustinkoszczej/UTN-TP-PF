import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Animated } from 'react-native';
import { getCustomStyles } from '@utils/styleUtils';

import { textVariants } from './constants';
import styles from './styles';

class CustomText extends PureComponent {
  static COLOR_PREFIX = 'Color';

  static VARIANTS = textVariants;

  static COLORS = ['thunderbird', 'emperor', 'boulder', 'doveGray', 'tundora'];

  customTextColor = () => getCustomStyles(CustomText.COLORS, this.props, styles, CustomText.COLOR_PREFIX);

  customStyles = () => getCustomStyles(CustomText.VARIANTS, this.props, styles);

  capitalizeText = str => str.replace(/^\w/, firstLetter => firstLetter.toUpperCase());

  render() {
    const { textProps, children, style, uppercase, capitalize, onPress, animated } = this.props;
    const TextComp = animated ? Animated.Text : Text;
    return (
      <TextComp
        {...textProps}
        style={[styles.base, this.customStyles(), this.customTextColor(), style]}
        onPress={onPress}
      >
        {capitalize ? this.capitalizeText(children) : uppercase ? children.toUpperCase() : children}
      </TextComp>
    );
  }
}

CustomText.defaultProps = {
  textProps: {}
};

CustomText.propTypes = {
  children: PropTypes.node,
  textProps: PropTypes.shape({ ...Text.propTypes }),
  onPress: PropTypes.func,
  animated: PropTypes.bool,
  capitalize: PropTypes.bool,
  uppercase: PropTypes.bool
};

export default CustomText;

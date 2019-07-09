import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import CustomText from '@components/CustomText';

import icImage from '../../assets/ic_image.png';

import styles from './styles';

function Checkbox({
  onPress,
  onLongPress,
  selected,
  title,
  icon,
  optionIcon,
  disabled,
  paused,
  style,
  textProps
}) {
  return (
    <TouchableOpacity
      disabled={disabled || paused}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, selected && styles.selected, disabled && styles.disabled, style]}
    >
      {!!optionIcon && selected && (
        <Image source={optionIcon} resizeMode="contain" style={styles.optionIcon} />
      )}
      {!!icon && <Image source={icon} defaultSource={icImage} resizeMode="contain" style={styles.icon} />}
      <CustomText dividerSmall {...textProps}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
}

Checkbox.propTypes = {
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.number,
  optionIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  disabled: PropTypes.bool,
  textProps: PropTypes.shape({ ...Text.propTypes }),
  paused: PropTypes.bool
};

export default Checkbox;

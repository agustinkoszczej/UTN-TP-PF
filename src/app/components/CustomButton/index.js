import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, ViewPropTypes, View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { getCustomStyles } from '@utils/styleUtils';
import CustomText from '@components/CustomText';
import { white, oceanGreen } from '@constants/colors';

import styles from './styles';

export const activeOpacities = {
  DEFAULT: 0.8,
  BORDERLESS: 0.2
};

class CustomButton extends PureComponent {
  static VARIANTS = [
    'borderless',
    'primaryBtn',
    'secondaryBtn',
    'disabled',
    'bold',
    'error',
    'center',
    'left',
    'right',
    'normal',
    'uppercase',
    'capitalize'
  ];

  customStyles = () => getCustomStyles(CustomButton.VARIANTS, this.props, styles);

  customTextStyles = () => getCustomStyles(CustomButton.VARIANTS, this.props, styles, 'Text');

  render() {
    const {
      onPress,
      style,
      activeOpacity,
      disabled,
      borderless,
      primaryBtn,
      loading,
      hidden,
      ...props
    } = this.props;
    const {
      icon,
      iconStyle,
      title,
      children,
      uppercase,
      textStyle,
      leftComponent,
      rightComponent,
      ...textProps
    } = props;
    const text = title || children;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          loading && styles.loadingContainer,
          borderless && styles.borderlessWrapper,
          primaryBtn && styles.primaryBtn,
          this.customStyles(),
          style
        ]}
        activeOpacity={borderless ? activeOpacities.BORDERLESS : activeOpacity}
        disabled={disabled || loading || hidden}
      >
        {hidden ? null : loading ? (
          <ActivityIndicator size="small" color={primaryBtn ? white : oceanGreen} />
        ) : (
          <>
            <View style={(leftComponent || rightComponent) && styles.leftComponent}>{leftComponent}</View>
            <View style={styles.centerContainer}>
              {icon && <Image source={icon} resizeMode="contain" style={[styles.icon, iconStyle]} />}
              {text && (
                <CustomText
                  primaryButton={primaryBtn}
                  disabledButton={disabled}
                  uppercase={primaryBtn || disabled || uppercase}
                  {...textProps}
                  style={[styles.text, this.customTextStyles(), textStyle]}
                >
                  {text}
                </CustomText>
              )}
            </View>
            <View style={(leftComponent || rightComponent) && styles.rightComponent}>{rightComponent}</View>
          </>
        )}
      </TouchableOpacity>
    );
  }
}

CustomButton.defaultProps = {
  activeOpacity: activeOpacities.DEFAULT
};

CustomButton.propTypes = {
  activeOpacity: PropTypes.number,
  disabled: PropTypes.bool,
  icon: PropTypes.number,
  iconStyle: ViewPropTypes.style,
  elementsStyle: ViewPropTypes.style,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  title: PropTypes.string,
  leftComponent: PropTypes.node,
  rightComponent: PropTypes.node,
  borderless: PropTypes.bool,
  primaryBtn: PropTypes.bool,
  loading: PropTypes.bool,
  hidden: PropTypes.bool
};

export default CustomButton;

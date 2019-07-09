import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, KeyboardAvoidingView, ImageBackground, Image } from 'react-native';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import CustomModal from '@components/CustomModal';
import { isIos } from '@constants/platform';

import { strings } from './i18n';
import styles from './styles';

function CustomDialog({
  children,
  title,
  onAcceptDialog,
  onRejectDialog,
  onRequestClose,
  acceptTitle,
  denyTitle,
  background,
  singleAction,
  style,
  childrenStyle,
  denyButtonStyles,
  acceptButtonStyles,
  ...props
}) {
  return (
    <CustomModal onRequestClose={onRequestClose} {...props}>
      <KeyboardAvoidingView behavior="padding" enabled={isIos} style={[styles.content, style]}>
        <ImageBackground source={background} resizeMode="cover" style={styles.backgroundImage}>
          <View style={[styles.contentContainer, childrenStyle]}>
            {!!title && (
              <CustomText title center style={styles.title}>
                {title}
              </CustomText>
            )}
            {children}
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              primaryBtn
              title={acceptTitle}
              onPress={onAcceptDialog}
              style={[styles.acceptButton, acceptButtonStyles]}
            />
            {!singleAction && (
              <CustomButton
                borderless
                link
                title={denyTitle}
                onPress={onRejectDialog || onRequestClose}
                style={[styles.denyButton, denyButtonStyles]}
              />
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </CustomModal>
  );
}

CustomDialog.defaultProps = {
  acceptTitle: strings.CONFIRM_DEFAULT(),
  denyTitle: strings.DENY_DEFAULT()
};

CustomDialog.propTypes = {
  acceptTitle: PropTypes.string,
  borderlessAction: PropTypes.bool,
  denyTitle: PropTypes.string,
  background: Image.propTypes.source,
  onAcceptDialog: PropTypes.func.isRequired,
  onRejectDialog: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func,
  singleAction: PropTypes.bool,
  title: PropTypes.string,
  childrenStyle: ViewPropTypes.style,
  denyButtonStyles: ViewPropTypes.style,
  acceptButtonStyles: ViewPropTypes.style
};

export default CustomDialog;

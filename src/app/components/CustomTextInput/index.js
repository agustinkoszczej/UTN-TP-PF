import React, { PureComponent } from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';
import withForm from '@components/withForm';
import { transparent, alto } from '@constants/colors';

import ShowPassword from './components/ShowPassword';
import styles from './styles';

// Known issue: showing/hiding the text with secureTextEntry changes the cursor position
// https://github.com/facebook/react-native/issues/5859

class CustomTextInput extends PureComponent {
  state = {
    showPassword: false,
    active: false
  };

  handleShowPassword = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  toggleActive = () => {
    this.setState(prevState => ({
      active: !prevState.active
    }));
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.toggleActive();
    (onFocus || Function)();
  };

  onBlur = () => {
    const { onBlur } = this.props;
    this.toggleActive();
    (onBlur || Function)();
  };

  render() {
    const {
      value,
      title,
      titleStyles,
      multiline,
      style,
      underline,
      onChange,
      textStyles,
      multilineContainerStyle,
      secureTextEntry,
      showEye,
      invalid,
      labelIcon,
      error,
      errorStyle,
      textRef,
      deactivateIconColor,
      onTextSubmitEditing
    } = this.props;
    const { showPassword, active } = this.state;
    return (
      <>
        {title && (
          <CustomText alto small style={[styles.title, titleStyles]}>
            {title}
          </CustomText>
        )}
        <View
          style={[
            multiline ? multilineContainerStyle : styles.container,
            underline && [
              styles.underline,
              !deactivateIconColor && active && styles.underlineActive,
              !deactivateIconColor && invalid && styles.underlineError
            ],
            style
          ]}
        >
          {labelIcon && (
            <Image
              source={labelIcon}
              style={[
                styles.labelIcon,
                !deactivateIconColor && active && styles.labelIconActive,
                invalid && styles.labelIconError
              ]}
            />
          )}
          <TextInput
            {...this.props}
            allowFontScaling={false}
            onChangeText={onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            value={value}
            style={[styles.inputStyle, multiline ? styles.multilineInput : styles.singleInput, textStyles]}
            placeholderTextColor={alto}
            secureTextEntry={secureTextEntry && !showPassword}
            autoComplete={!secureTextEntry}
            ref={textRef}
            onSubmitEditing={onTextSubmitEditing}
            multiline={multiline}
          />
          {secureTextEntry && showEye && (
            <ShowPassword onShowPassword={this.handleShowPassword} passwordVisible={showPassword} />
          )}
        </View>
        <CustomText error style={[styles.errorMessage, errorStyle]}>
          {invalid && error}
        </CustomText>
      </>
    );
  }
}

CustomTextInput.defaultProps = {
  placeholder: this.emptyString,
  autoCorrect: false,
  autoCapitalize: 'sentences',
  clearButtonMode: 'never',
  returnKeyType: 'done',
  underlineColorAndroid: transparent,
  keyboardType: 'default',
  multiline: false,
  underline: false,
  deactivateIconColor: false,
  maxHeight: 200
};

CustomTextInput.propTypes = {
  underline: PropTypes.bool,
  autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  clearButtonMode: PropTypes.oneOf(['never', 'while-editing', 'unless-editing', 'always']),
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search']),
  keyboardType: PropTypes.oneOf(['default', 'numeric', 'email-address', 'phone-pad']),
  underlineColorAndroid: PropTypes.string,
  maxHeight: PropTypes.number,
  autoCorrect: PropTypes.bool,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  titleStyles: Text.propTypes.style,
  textStyles: Text.propTypes.style,
  multilineContainerStyle: Text.propTypes.style,
  errorStyle: Text.propTypes.style,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  showEye: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  title: PropTypes.string,
  textRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onTextSubmitEditing: PropTypes.func,
  labelIcon: PropTypes.number,
  deactivateIconColor: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.bool
};

export const FormField = withForm(CustomTextInput);

export default CustomTextInput;

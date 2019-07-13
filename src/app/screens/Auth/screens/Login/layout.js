import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { compose } from 'recompose';
import emailIcon from '@assets/ic_mail.png';
import passwordIcon from '@assets/ic_password.png';
import BaseForm from '@components/BaseForm';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import KeyboardAware from '@components/KeyboardAware';
import Loadable from '@components/Loadable';
import { transparent } from '@constants/colors';
import logo from '@assets/whiteLogo.png';

import { strings, LOGIN_FIELDS } from './constants';
import styles from './styles';

const KeyboardAwareImage = KeyboardAware(Image);
const KeyboardAwareView = KeyboardAware(View);

class Login extends Component {
  [LOGIN_FIELDS.PASSWORD] = React.createRef();

  handleEmailSubmitting = () => {
    this[LOGIN_FIELDS.PASSWORD].current.focus();
  };

  handleRecoverPassword = () => {
    const {
      gotoRecoverPassword,
      values: { email }
    } = this.props;
    gotoRecoverPassword(email);
  };

  render() {
    const { handleSubmit, onInputChange, credentialsError, gotoSignUp } = this.props;
    return (
      <BaseForm link onSubmit={handleSubmit}>
        <KeyboardAwareView
          behavior="padding"
          style={styles.container}
          styleDuringKeyboardShow={styles.hiddenLogoView}
        >
          <KeyboardAwareImage
            source={logo}
            style={styles.logo}
            styleDuringKeyboardShow={styles.hiddenLogo}
            noAnimation
          />
          <View>
            <CustomTextInput
              name={LOGIN_FIELDS.EMAIL}
              underlineColorAndroid={transparent}
              placeholder={strings.email}
              style={styles.formElement}
              keyboardType="email-address"
              labelIcon={emailIcon}
              autoCapitalize="none"
              returnKeyType="next"
              onTextSubmitEditing={this.handleEmailSubmitting}
              underline
              onChange={onInputChange}
              invalid={credentialsError}
            />
            <CustomTextInput
              name={LOGIN_FIELDS.PASSWORD}
              underlineColorAndroid={transparent}
              labelIcon={passwordIcon}
              placeholder={strings.password}
              style={styles.formElement}
              secureTextEntry
              showEye
              autoCapitalize="none"
              textRef={this[LOGIN_FIELDS.PASSWORD]}
              onTextSubmitEditing={handleSubmit}
              returnKeyType="go"
              underline
              onChange={onInputChange}
              invalid={credentialsError}
              error={credentialsError}
            />
            <CustomButton
              borderless
              link
              onPress={this.handleRecoverPassword}
              title={strings.forgotPassword}
              textStyle={styles.blackText}
              style={styles.forgotPasswordBtn}
            />
            <CustomButton
              primaryBtn
              onPress={handleSubmit}
              title={strings.loginMessage.toUpperCase()}
              style={styles.loginBtn}
              textStyle={styles.whiteText}
            />
            <View style={styles.registerAccount}>
              <CustomText secondary style={styles.signUpTxt}>
                {strings.hasAccount}
              </CustomText>
              <CustomButton
                borderless
                link
                onPress={gotoSignUp}
                title={strings.signUp}
                textStyle={styles.blackText}
              />
            </View>
          </View>
        </KeyboardAwareView>
      </BaseForm>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  gotoRecoverPassword: PropTypes.func.isRequired,
  credentialsError: PropTypes.string,
  values: PropTypes.shape({ email: PropTypes.string, password: PropTypes.string }),
  gotoSignUp: PropTypes.func.isRequired
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema }) => validationSchema,
    handleSubmit: (values, { props }) => props.onLogin(values)
  }),
  Loadable(props => props.loading)
);

export default enhancer(Login);

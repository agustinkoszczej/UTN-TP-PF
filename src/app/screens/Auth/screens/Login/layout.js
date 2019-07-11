import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, View } from 'react-native';
import { compose } from 'recompose';
import emailIcon from '@assets/ic_mail.png';
import passwordIcon from '@assets/ic_password.png';
import BaseForm from '@components/BaseForm';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import Loadable from '@components/Loadable';
import { transparent } from '@constants/colors';
import { isIos } from '@constants/platform';
import logo from '@assets/logo.png';

import { strings, LOGIN_FIELDS } from './constants';
import styles from './styles';

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
    const { handleSubmit, onInputChange, credentialsError } = this.props;
    return (
      <BaseForm showButton borderless link onSubmit={handleSubmit} buttonTitle={strings.orderWithoutRegister}>
        <KeyboardAvoidingView behavior="padding" enabled={isIos}>
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
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
              title={strings.FORGOT_PASSWORD()}
              textStyle={styles.greenText}
              style={styles.forgotPasswordBtn}
            />
            <CustomButton
              primaryBtn
              onPress={handleSubmit}
              title={strings.LOGIN_MESSAGE().toUpperCase()}
              style={styles.loginBtn}
            />
            <View style={styles.separatorContainer}>
              <View style={styles.graySeparator} />
              <CustomText secondary style={styles.separatorText}>
                {strings.OR_LOG_IN()}
              </CustomText>
              <View style={styles.graySeparator} />
            </View>
            {/* <View style={styles.registerAccount}>
                <CustomText secondary style={styles.signUpTxt}>
                  {strings.HAS_ACCOUNT()}
                </CustomText>
                <CustomButton
                  borderless
                  link
                  onPress={gotoSignUp}
                  title={strings.SIGN_UP()}
                  textStyle={styles.greenText}
                />
              </View> */}
          </View>
        </KeyboardAvoidingView>
      </BaseForm>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  gotoRecoverPassword: PropTypes.func.isRequired,
  credentialsError: PropTypes.string,
  values: PropTypes.shape({ email: PropTypes.string, password: PropTypes.string })
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

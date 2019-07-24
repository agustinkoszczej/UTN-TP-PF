import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import Loadable from '@components/Loadable';
import { PHONE_LENGTH, NAME_LENGTH, PASSWORD_LENGTH } from '@constants/user';
import emailIcon from '@assets/ic_mail.png';
import passwordIcon from '@assets/ic_password.png';
import phoneIcon from '@assets/ic_phone.png';
import userIcon from '@assets/ic_user.png';
import { handlePhoneFormatChange } from '@utils/phoneUtils';

import { strings, SIGN_UP_FIELDS } from './constants';
import styles from './styles';

class SignUp extends Component {
  [SIGN_UP_FIELDS.EMAIL] = React.createRef();

  [SIGN_UP_FIELDS.PHONE] = React.createRef();

  [SIGN_UP_FIELDS.PASSWORD] = React.createRef();

  handleNameSubmitting = () => {
    this[SIGN_UP_FIELDS.EMAIL].current.focus();
  };

  handleEmailSubmitting = () => {
    this[SIGN_UP_FIELDS.PHONE].current.focus();
  };

  handlePhoneSubmitting = () => {
    this[SIGN_UP_FIELDS.PASSWORD].current.focus();
  };

  handlePhoneOnBlur = () => {
    const {
      values: { phone },
      setFieldValue
    } = this.props;
    handlePhoneFormatChange(phone, setFieldValue);
  };

  render() {
    const { gotoLogIn, handleSubmit, onEmailChange, emailError } = this.props;
    const commonProps = {
      underline: true,
      returnKeyType: 'next',
      autoCapitalize: 'none',
      style: styles.formElement
    };
    return (
      <View style={styles.container}>
        <CustomTextInput
          {...commonProps}
          autoCapitalize="words"
          labelIcon={userIcon}
          name={SIGN_UP_FIELDS.NAME}
          placeholder={strings.name}
          onTextSubmitEditing={this.handleNameSubmitting}
          maxLength={NAME_LENGTH}
          applyTrim
        />
        <CustomTextInput
          {...commonProps}
          keyboardType="email-address"
          labelIcon={emailIcon}
          name={SIGN_UP_FIELDS.EMAIL}
          placeholder={strings.email}
          textRef={this[SIGN_UP_FIELDS.EMAIL]}
          onTextSubmitEditing={this.handleEmailSubmitting}
          invalid={!!emailError}
          error={emailError}
          onChange={onEmailChange}
          applyTrim
        />
        <CustomTextInput
          {...commonProps}
          keyboardType="phone-pad"
          labelIcon={phoneIcon}
          name={SIGN_UP_FIELDS.PHONE}
          placeholder={strings.phone}
          textRef={this[SIGN_UP_FIELDS.PHONE]}
          onTextSubmitEditing={this.handlePhoneSubmitting}
          maxLength={PHONE_LENGTH}
          onBlur={this.handlePhoneOnBlur}
        />
        <CustomTextInput
          {...commonProps}
          labelIcon={passwordIcon}
          name={SIGN_UP_FIELDS.PASSWORD}
          placeholder={strings.password}
          showEye
          returnKeyType="go"
          secureTextEntry
          textRef={this[SIGN_UP_FIELDS.PASSWORD]}
          onTextSubmitEditing={handleSubmit}
          maxLength={PASSWORD_LENGTH}
          avoidSpaces
        />
        <CustomButton
          primaryBtn
          onPress={handleSubmit}
          title={strings.signUpButton}
          style={styles.signUpBtn}
        />
        <View style={styles.accountExistsContainer}>
          <CustomText secondary style={styles.hasAccountTxt}>
            {strings.hasAccount}
          </CustomText>
          <CustomButton link borderless onPress={gotoLogIn} title={strings.logIn} style={styles.logInBtn} />
        </View>
      </View>
    );
  }
}

SignUp.propTypes = {
  gotoLogIn: PropTypes.func.isRequired,
  onOrderAsAGuest: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    phone: PropTypes.string
  }).isRequired
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema }) => validationSchema,
    handleSubmit: (values, { props }) => props.onSignUp(values)
  }),
  Loadable(props => props.loading, true)
);

export default enhancer(SignUp);

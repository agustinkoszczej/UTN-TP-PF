import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import Loadable from '@components/Loadable';
import { PHONE_LENGTH, NAME_LENGTH, PASSWORD_LENGTH } from '@constants/user';
import emailIcon from '@assets/ic_mail.png';
import passwordIcon from '@assets/ic_password.png';
import phoneIcon from '@assets/ic_phone.png';
import userIcon from '@assets/ic_user.png';
import noteIcon from '@assets/ic_note.png';
import { handlePhoneFormatChange } from '@utils/phoneUtils';

import { strings, SIGN_UP_FIELDS } from '../../constants';

import styles from './styles';

class DataStep extends Component {
  [SIGN_UP_FIELDS.EMAIL] = React.createRef();

  [SIGN_UP_FIELDS.CUIT] = React.createRef();

  [SIGN_UP_FIELDS.PHONE] = React.createRef();

  [SIGN_UP_FIELDS.PASSWORD] = React.createRef();

  handleNameSubmitting = () => {
    this[SIGN_UP_FIELDS.EMAIL].current.focus();
  };

  handleCUITSubmitting = () => {
    this[SIGN_UP_FIELDS.CUIT].current.focus();
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
    const { handleSubmit, onEmailChange, emailError, onCUITChange, cuitError } = this.props;
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
          labelIcon={noteIcon}
          name={SIGN_UP_FIELDS.CUIT}
          placeholder={strings.cuit}
          textRef={this[SIGN_UP_FIELDS.CUIT]}
          onTextSubmitEditing={this.handleCUITSubmitting}
          invalid={!!cuitError}
          error={cuitError}
          onChange={onCUITChange}
          applyTrim
          maxLength={11}
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
      </View>
    );
  }
}

DataStep.propTypes = {
  gotoLogIn: PropTypes.func.isRequired,
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
    validationSchema: ({ validationSchema }) => validationSchema
  })
);

export default enhancer(DataStep);

import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import emailIcon from '@assets/ic_mail.png';
import { transparent } from '@constants/colors';
import KeyboardAware from '@components/KeyboardAware';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import { FormField as CustomTextInput } from '@components/CustomTextInput';

import { strings, RECOVER_PASSWORD_FIELDS } from './constants';
import styles from './styles';

const KeyboardAwareView = KeyboardAware(View);

function RecoverPassword({ handleSubmit, emailError, onInputChange, loading }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <KeyboardAwareView style={styles.keyboardAwareView}>
        <CustomText title center style={styles.title}>
          {strings.forgotYourPassword}
        </CustomText>
        <CustomText center style={styles.subtitle}>
          {strings.enterYourEmailAndRecover}
        </CustomText>
        <CustomTextInput
          underline
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="go"
          onTextSubmitEditing={handleSubmit}
          style={styles.emailInput}
          name={RECOVER_PASSWORD_FIELDS.EMAIL}
          underlineColorAndroid={transparent}
          placeholder={strings.email}
          labelIcon={emailIcon}
          errorStyle={styles.inputError}
          invalid={!!emailError}
          error={emailError}
          onChange={onInputChange}
        />
        <CustomButton
          primaryBtn
          title={strings.send}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitBtn}
          textStyle={styles.whiteText}
        />
      </KeyboardAwareView>
    </KeyboardAvoidingView>
  );
}

RecoverPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  emailError: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema }) => validationSchema,
    handleSubmit: (values, { props }) => props.onRecoverPassword(values)
  })
);
export default enhancer(RecoverPassword);

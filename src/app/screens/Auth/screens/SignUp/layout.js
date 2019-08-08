import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import StepIndicator from '@components/CustomStepper';
import KeyboardAware from '@components/KeyboardAware';
import logo from '@assets/whiteLogo.png';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import Loadable from '@components/Loadable';
import BaseForm from '@components/BaseForm';

import QRStep from './components/QRStep';
import LocationStep from './components/LocationStep';
import CompanyDataStep from './components/CompanyDataStep';
import UserDataStep from './components/UserDataStep';
import styles, { stepIndicatorStyles } from './styles';
import { STEP_INDICATOR_LABELS, STEP_INDICATOR_STEPS, strings, SIGN_UP_FIELDS } from './constants';

const KeyboardAwareImage = KeyboardAware(Image);
const KeyboardAwareView = KeyboardAware(View);

class SignUp extends Component {
  componentDidUpdate(prevProps) {
    const { currentStep, setTouched } = this.props;
    if (prevProps.currentStep !== currentStep) setTouched(false);
  }

  render() {
    const { currentStep, onGoToLogin, handleSubmit, values, setFieldValue } = this.props;
    const finalStep = currentStep === 3;
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
          <StepIndicator
            customStyles={stepIndicatorStyles}
            currentPosition={currentStep}
            stepCount={STEP_INDICATOR_STEPS}
            labels={STEP_INDICATOR_LABELS}
            currentStepCompleted
          />
          {
            {
              0: <UserDataStep handleSubmit={handleSubmit} values={values} />,
              1: (
                <CompanyDataStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />
              ),
              2: <LocationStep setFieldValue={setFieldValue} values={values} />,
              3: <QRStep setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
            }[currentStep]
          }
          <CustomButton
            primaryBtn
            onPress={handleSubmit}
            title={!finalStep ? strings.next : strings.signUpButton}
            textStyle={styles.whiteText}
            style={styles.signUpBtn}
          />
          <View style={styles.accountExistsContainer}>
            <CustomText secondary style={styles.hasAccountTxt}>
              {strings.hasAccount}
            </CustomText>
            <CustomButton
              link
              borderless
              onPress={onGoToLogin}
              title={strings.logIn}
              textStyle={styles.blackText}
              style={styles.logInBtn}
            />
          </View>
        </KeyboardAwareView>
      </BaseForm>
    );
  }
}

SignUp.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGoToLogin: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [SIGN_UP_FIELDS.ADDRESS]: PropTypes.string,
    [SIGN_UP_FIELDS.COMPANY_NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.CUIT]: PropTypes.string,
    [SIGN_UP_FIELDS.EMAIL]: PropTypes.string,
    [SIGN_UP_FIELDS.LOCATION]: PropTypes.string,
    [SIGN_UP_FIELDS.NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.PASSWORD]: PropTypes.string,
    [SIGN_UP_FIELDS.PHONE]: PropTypes.string,
    [SIGN_UP_FIELDS.QR_URL]: PropTypes.string,
    [SIGN_UP_FIELDS.STREET_NUMBER]: PropTypes.string
  })
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema, currentStep }) => validationSchema[currentStep],
    handleSubmit: (values, { props }) => (props.currentStep === 3 ? props.onSignUp(values) : props.onNext())
  }),
  Loadable(props => props.loading)
);

export default enhancer(SignUp);

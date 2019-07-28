import React from 'react';
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
import DataStep from './components/DataStep';
import styles, { stepIndicatorStyles } from './styles';
import {
  STEP_INDICATOR_LABELS,
  STEP_INDICATOR_STEPS,
  strings,
  SIGN_UP_FIELDS,
  LOCATION_FIELDS
} from './constants';
import UsernameStep from './components/UsernameSteps/layout';

const KeyboardAwareImage = KeyboardAware(Image);
const KeyboardAwareView = KeyboardAware(View);

function SignUp({ currentStep, onGoToLogin, handleSubmit, values, setFieldValue }) {
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
            0: <UsernameStep handleSubmit={handleSubmit} values={values} />,
            1: <DataStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />,
            2: <LocationStep setFieldValue={setFieldValue} />,
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

SignUp.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGoToLogin: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [SIGN_UP_FIELDS.NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.EMAIL]: PropTypes.string,
    [SIGN_UP_FIELDS.PHONE]: PropTypes.string,
    [SIGN_UP_FIELDS.CUIT]: PropTypes.string,
    [SIGN_UP_FIELDS.LOCATION]: PropTypes.shape({
      [LOCATION_FIELDS.LONGITUDE]: PropTypes.number,
      [LOCATION_FIELDS.STREET_NUMBER]: PropTypes.number,
      [LOCATION_FIELDS.LATITUDE]: PropTypes.number,
      [LOCATION_FIELDS.ADDRESS]: PropTypes.string
    })
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

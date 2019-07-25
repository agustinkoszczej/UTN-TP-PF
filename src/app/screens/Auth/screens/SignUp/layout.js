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
import DataStep from './components/DataStep';
import styles, { stepIndicatorStyles } from './styles';
import { STEP_INDICATOR_LABELS, STEP_INDICATOR_STEPS, strings } from './constants';

const KeyboardAwareImage = KeyboardAware(Image);
const KeyboardAwareView = KeyboardAware(View);

function SignUp({ currentStep, handleSubmit, onGoToLogin }) {
  const finalStep = currentStep === STEP_INDICATOR_STEPS.length;
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
        {{ 1: <DataStep handleSubmit={handleSubmit} />, 2: <QRStep /> }[currentStep + 1]}

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
  onGoToLogin: PropTypes.func.isRequired
};

const enhancer = compose(
  withFormik({
    validationSchema: ({ validationSchema }) => validationSchema,
    handleSubmit: (values, { props }) => (props.currentStep === 3 ? props.onSignUp(values) : props.onNext())
  }),
  Loadable(props => props.loading)
);

export default enhancer(SignUp);

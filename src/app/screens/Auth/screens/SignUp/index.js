import React from 'react';
import { View, Image } from 'react-native';
import StepIndicator from '@components/CustomStepper';
import KeyboardAware from '@components/KeyboardAware';
import logo from '@assets/whiteLogo.png';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';

import { strings } from './components/DataStep/constants';
import QRStep from './components/QRStep';
import DataStep from './components/DataStep';
import styles, { stepIndicatorStyles } from './styles';
import { STEP_INDICATOR_LABELS, STEP_INDICATOR_STEPS } from './constants';

const KeyboardAwareImage = KeyboardAware(Image);
const KeyboardAwareView = KeyboardAware(View);

function SignUp() {
  return (
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
        currentPosition={0}
        stepCount={STEP_INDICATOR_STEPS}
        labels={STEP_INDICATOR_LABELS}
        currentStepCompleted={1}
      />
      <DataStep />
      <CustomButton
        primaryBtn
        onPress={() => {}}
        title={true ? strings.next : strings.signUpButton}
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
          onPress={() => {}}
          title={strings.logIn}
          textStyle={styles.blackText}
          style={styles.logInBtn}
        />
      </View>
    </KeyboardAwareView>
  );
}

export default SignUp;

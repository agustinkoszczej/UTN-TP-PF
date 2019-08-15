import { StyleSheet } from 'react-native';
import { tundora, white, black, alto, dustyGray, doveGray, gray } from '@constants/colors';
import { scale, verticalScale } from '@utils/scalingUtils';

export const stepIndicatorStyles = {
  // Current Step
  currentStepIndicatorLabelFontSize: 16,
  currentStepIndicatorSize: 25,
  currentStepLabelColor: tundora,
  currentStepStrokeWidth: 0,
  stepIndicatorLabelCurrentColor: white,
  // Labels
  labelColor: doveGray,
  labelSize: 15,
  // Separator
  finishedSeparatorColor: black,
  separatorStrokeWidth: 2,
  unfinishedSeparatorColor: dustyGray,
  // Steps
  stepStrokeWidth: 0,
  // Step Indicator
  finishedStepIndicatorColor: black,
  currentStepIndicatorLabelColor: white,
  finishedStepIndicatorLabelColor: white,
  stepIndicatorLabelFontSize: 16,
  unfinishedStepIndicatorLabelColor: white,
  stepIndicatorSize: 25,
  unfinishedStepIndicatorColor: alto
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingVertical: 40
  },
  hiddenLogoView: {
    paddingTop: scale(30),
    paddingBottom: scale(200),
    justifyContent: 'flex-start'
  },
  logo: {
    alignSelf: 'center',
    marginTop: verticalScale(10),
    height: scale(150),
    width: scale(300)
  },
  hiddenLogo: {
    width: 0,
    height: 0,
    marginBottom: 0
  },
  blackText: {
    color: black
  },
  whiteText: {
    color: white
  },
  hasAccountTxt: {
    alignSelf: 'center',
    color: gray
  },
  accountExistsContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15
  },
  logInBtn: {
    marginLeft: 5
  },
  signUpBtn: {
    borderRadius: 5,
    width: '45%'
  },
  backButton: {
    borderRadius: 5,
    width: '45%',
    marginRight: '5%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default styles;

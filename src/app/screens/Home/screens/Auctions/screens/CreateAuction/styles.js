import { StyleSheet } from 'react-native';
import { tundora, white, black, alto, dustyGray, doveGray } from '@constants/colors';

const styles = StyleSheet.create({
  whiteText: {
    color: white
  },
  container: {
    flex: 1,
    padding: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  backButton: {
    borderRadius: 5,
    width: '45%',
    marginRight: '5%'
  },
  createButton: {
    borderRadius: 5,
    width: '45%'
  }
});
export default styles;

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

import { StyleSheet } from 'react-native';
import { tundora, white, oceanGreen, black, caribbeanGreen } from '@constants/colors';

import { STEP_STATUS } from './constants';

export const defaultStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  unfinishedSeparatorStrokeWidth: 0,
  finishedSeparatorStrokeWidth: 0,
  currentStepStrokeWidth: 5,
  stepStrokeWidth: 0,
  currentStepStrokeColor: oceanGreen,
  finishedStepStrokeColor: oceanGreen,
  unfinishedStepStrokeColor: oceanGreen,
  finishedSeparatorColor: oceanGreen,
  unfinishedSeparatorColor: caribbeanGreen,
  finishedStepIndicatorColor: oceanGreen,
  unfinishedStepIndicatorColor: caribbeanGreen,
  currentStepIndicatorColor: tundora,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelColor: black,
  finishedStepIndicatorLabelColor: white,
  unfinishedStepIndicatorLabelColor: white,
  labelColor: black,
  labelSize: 13,
  labelAlign: 'center',
  currentStepLabelColor: oceanGreen
};

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  step: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  stepLabel: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 20
  }
});

export const getProgressBarBackgroundStyle = props => {
  const { width, height, customStyles, stepCount } = props;
  return {
    backgroundColor: customStyles.unfinishedSeparatorColor,
    position: 'absolute',
    top: (height - customStyles.separatorStrokeWidth) / 2,
    left: width / (2 * stepCount),
    right: width / (2 * stepCount),
    height:
      customStyles.unfinishedSeparatorStrokeWidth === 0
        ? customStyles.separatorStrokeWidth
        : customStyles.unfinishedSeparatorStrokeWidth
  };
};

export const getProgressBarStyle = props => {
  const { customStyles, progressBarSize, currentPosition, stepCount } = props;
  return {
    ...getProgressBarBackgroundStyle(props),
    backgroundColor: customStyles.finishedSeparatorColor,
    height:
      customStyles.finishedSeparatorStrokeWidth === 0
        ? customStyles.separatorStrokeWidth
        : customStyles.finishedSeparatorStrokeWidth,
    width: (progressBarSize / (stepCount - 1)) * currentPosition
  };
};

export const getStepStyle = (stepStatus, customStyles) => {
  return {
    stepStyle: {
      width: customStyles.stepIndicatorSize,
      height: customStyles.stepIndicatorSize,
      borderRadius: customStyles.stepIndicatorSize / 2,
      backgroundColor: customStyles[`${stepStatus}StepIndicatorColor`],
      borderWidth: customStyles[`${stepStatus}StepStrokeWidth`],
      borderColor: customStyles[`${stepStatus}StepStrokeColor`]
    },
    indicatorLabelStyle: {
      overflow: stepStatus === STEP_STATUS.FINISHED ? 'hidden' : 'visible',
      fontSize: customStyles[`${stepStatus}StepIndicatorLabelFontSize`],
      color: customStyles[`${stepStatus}StepIndicatorLabelColor`]
    }
  };
};

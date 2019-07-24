import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import CustomText from '@components/CustomText';

import styles from './styles';
import StepIndicator from './components/StepIndicator';
import { customStyles as customStylesPropTypes } from './propTypes';

class CustomStepper extends Component {
  onLayout = event => {
    const { onLayout } = this.props;
    onLayout(event);
  };

  render() {
    const {
      labels,
      currentPosition,
      customStyles,
      width,
      progressBarBackgroundStyle,
      progressBarStyle
    } = this.props;
    const widthZero = width !== 0;
    return (
      <View style={[styles.container, styles.column]}>
        {widthZero && <View onLayout={this.onLayout} style={progressBarBackgroundStyle} />}
        {widthZero && <View style={progressBarStyle} />}
        <StepIndicator {...this.props} />
        <CustomText
          center
          style={[
            styles.stepLabel,
            {
              fontSize: customStyles.labelSize,
              fontFamily: customStyles.labelFontFamily,
              color: customStyles.currentStepLabelColor
            }
          ]}
        >
          {labels?.[currentPosition]}
        </CustomText>
      </View>
    );
  }
}

CustomStepper.propTypes = {
  currentPosition: PropTypes.number.isRequired,
  customStyles: customStylesPropTypes.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number,
  onLayout: PropTypes.func.isRequired,
  progressBarBackgroundStyle: customStylesPropTypes,
  progressBarStyle: customStylesPropTypes
};

export default CustomStepper;

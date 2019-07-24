import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from '@components/CustomStepper/styles';
import CustomText from '@components/CustomText';

class Step extends Component {
  render() {
    const { position, getStepStyle } = this.props;
    const { stepStyle, indicatorLabelStyle } = getStepStyle(position);
    return (
      <View style={[styles.step, stepStyle]}>
        <CustomText style={indicatorLabelStyle}>{`${position + 1}`}</CustomText>
      </View>
    );
  }
}

Step.propTypes = {
  position: PropTypes.number.isRequired,
  getStepStyle: PropTypes.func.isRequired
};

export default Step;

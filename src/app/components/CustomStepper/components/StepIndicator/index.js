import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from '@components/CustomStepper/styles';
import Step from '@components/CustomStepper/components/Step';
import { customStyles as customStylesPropTypes } from '@components/CustomStepper/propTypes';

class StepIndicator extends Component {
  renderStepIndicator = () => {
    const { stepCount } = this.props;

    return [...Array(stepCount).keys()].map(position => (
      <Step key={position} position={position} {...this.props} />
    ));
  };

  handleLayout = event => {
    const { setSize } = this.props;
    setSize(event);
  };

  render() {
    const { customStyles } = this.props;
    const steps = this.renderStepIndicator();
    return (
      <View
        onLayout={this.handleLayout}
        style={[
          styles.stepIndicatorContainer,
          [styles.row, { height: customStyles.currentStepIndicatorSize }]
        ]}
      >
        {steps}
      </View>
    );
  }
}

StepIndicator.propTypes = {
  stepCount: PropTypes.number.isRequired,
  setSize: PropTypes.func.isRequired,
  customStyles: customStylesPropTypes.isRequired
};

export default StepIndicator;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStepStyle } from '@components/CustomStepper/styles';

import { defaultStyles, getProgressBarBackgroundStyle, getProgressBarStyle } from './styles';
import { STEP_STATUS } from './constants';
import { customStyles as customStylesPropTypes } from './propTypes';
import CustomStepper from './layout';

class CustomStepperContainer extends Component {
  state = {
    width: 0,
    height: 0,
    progressBarSize: 0,
    customStyles: { ...defaultStyles, ...this.props.customStyles }
  };

  setSize = ({ nativeEvent }) =>
    this.setState({
      width: nativeEvent.layout.width,
      height: nativeEvent.layout.height
    });

  handleLayout = event => {
    const { layout } = event.nativeEvent;
    this.setState({ progressBarSize: layout.width });
  };

  getStepStatus = stepPosition => {
    const { currentPosition, currentStepCompleted } = this.props;
    if (stepPosition < currentPosition) return STEP_STATUS.FINISHED;
    if (stepPosition > currentPosition) return STEP_STATUS.UNFINISHED;
    return stepPosition === currentPosition && !currentStepCompleted
      ? STEP_STATUS.CURRENT
      : STEP_STATUS.FINISHED;
  };

  getStepStyle = position => {
    const { customStyles } = this.state;
    const stepStatus = this.getStepStatus(position);
    return getStepStyle(stepStatus, customStyles);
  };

  render() {
    return (
      <CustomStepper
        {...this.props}
        {...this.state}
        onLayout={this.handleLayout}
        progressBarBackgroundStyle={getProgressBarBackgroundStyle({ ...this.props, ...this.state })}
        progressBarStyle={getProgressBarStyle({ ...this.props, ...this.state })}
        getStepStyle={this.getStepStyle}
        setSize={this.setSize}
      />
    );
  }
}

CustomStepperContainer.propTypes = {
  currentPosition: PropTypes.number,
  stepCount: PropTypes.number.isRequired,
  customStyles: customStylesPropTypes,
  labels: PropTypes.arrayOf(PropTypes.string),
  currentStepCompleted: PropTypes.bool.isRequired
};

CustomStepperContainer.defaultProps = {
  currentPosition: 0
};

export default CustomStepperContainer;

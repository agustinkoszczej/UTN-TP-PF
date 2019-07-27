import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DataStep from './layout';

class DataStepContainer extends Component {
  state = { emailError: '', cuitError: '' };

  handleEmailChange = () => {
    const { emailError } = this.state;
    if (emailError) this.clearError();
  };

  handleCUITChange = () => {
    const { cuitError } = this.state;
    if (cuitError) this.clearError();
  };

  render() {
    const { emailError, cuitError } = this.state;
    return (
      <DataStep
        onEmailChange={this.handleEmailChange}
        onCUITChange={this.handleCUITChange}
        emailError={emailError}
        cuitError={cuitError}
        {...this.props}
      />
    );
  }
}

DataStepContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default DataStepContainer;

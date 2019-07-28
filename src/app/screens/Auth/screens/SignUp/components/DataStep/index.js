import PropTypes from 'prop-types';
import React, { Component } from 'react';

import DataStep from './layout';

class DataStepContainer extends Component {
  state = { cuitError: '' };

  handleCUITChange = () => {
    const { cuitError } = this.state;
    if (cuitError) this.clearError();
  };

  render() {
    const { cuitError } = this.state;
    return <DataStep onCUITChange={this.handleCUITChange} cuitError={cuitError} {...this.props} />;
  }
}

DataStepContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default DataStepContainer;

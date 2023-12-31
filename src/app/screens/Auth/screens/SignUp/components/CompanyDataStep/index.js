import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CompanyDataStep from './layout';

class CompanyDataStepContainer extends Component {
  state = { cuitError: '' };

  handleCUITChange = () => {
    const { cuitError } = this.state;
    if (cuitError) this.clearError();
  };

  render() {
    const { cuitError } = this.state;
    return <CompanyDataStep onCUITChange={this.handleCUITChange} cuitError={cuitError} {...this.props} />;
  }
}

CompanyDataStepContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default CompanyDataStepContainer;

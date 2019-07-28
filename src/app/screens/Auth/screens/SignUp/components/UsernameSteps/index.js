import PropTypes from 'prop-types';
import React, { Component } from 'react';

import UsernameStep from './layout';

class UsernameStepContainer extends Component {
  state = { emailError: '' };

  handleEmailChange = () => {
    const { emailError } = this.state;
    if (emailError) this.clearError();
  };

  render() {
    const { emailError } = this.state;
    return <UsernameStep onEmailChange={this.handleEmailChange} emailError={emailError} {...this.props} />;
  }
}

UsernameStepContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default UsernameStepContainer;

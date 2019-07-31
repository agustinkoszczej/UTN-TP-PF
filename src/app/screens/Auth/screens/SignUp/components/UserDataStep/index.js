import PropTypes from 'prop-types';
import React, { Component } from 'react';

import UserDataStep from './layout';

class UserDataStepContainer extends Component {
  state = { emailError: '' };

  handleEmailChange = () => {
    const { emailError } = this.state;
    if (emailError) this.clearError();
  };

  render() {
    const { emailError } = this.state;
    return <UserDataStep onEmailChange={this.handleEmailChange} emailError={emailError} {...this.props} />;
  }
}

UserDataStepContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default UserDataStepContainer;

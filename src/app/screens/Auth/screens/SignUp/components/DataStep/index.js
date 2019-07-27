import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { object } from 'yup';
import { fieldsValidation } from '@utils/validations';

import { SIGN_UP_FIELDS, inputFieldsSignUp } from '../../constants';

import DataStep from './layout';

class DataStepContainer extends Component {
  state = { emailError: '', cuitError: '' };

  formValidationSchema = object().shape(fieldsValidation(inputFieldsSignUp, SIGN_UP_FIELDS));

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
        validationSchema={this.formValidationSchema}
        initialValues={this.initialValues}
        {...this.props}
      />
    );
  }
}

DataStepContainer.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default DataStepContainer;

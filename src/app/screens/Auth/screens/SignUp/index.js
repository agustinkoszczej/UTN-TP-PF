import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object } from 'yup';
import { fieldsValidation } from '@utils/validations';
import Routes from '@constants/routes';

import { SIGN_UP_FIELDS, inputFieldsSignUp } from './constants';
import SignUp from './layout';

class SignUpContainer extends Component {
  state = {
    currentStep: 0
  };

  formValidationSchema = object().shape(fieldsValidation(inputFieldsSignUp, SIGN_UP_FIELDS));

  handleGotoLogIn = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.Login);
  };

  handleNext = () => this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));

  render() {
    const { currentStep } = this.state;
    return (
      <SignUp
        currentStep={currentStep}
        onNext={this.handleNext}
        onGoToLogin={this.handleGotoLogIn}
        validationSchema={this.formValidationSchema}
      />
    );
  }
}

SignUpContainer.propTypes = {
  signUp: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  error: PropTypes.shape({
    code: PropTypes.string.isRequired
  })
};

export default SignUpContainer;

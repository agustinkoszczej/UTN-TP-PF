import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object } from 'yup';
import { connect } from 'react-redux';
import { fieldsValidation } from '@utils/validations';
import Routes from '@constants/routes';
import { COUNTRY_CODE } from '@constants/user';
import AuthActions from '@redux/auth/actions';

import { SIGN_UP_FIELDS, inputFieldsSignUp } from './constants';
import SignUp from './layout';

class SignUpContainer extends Component {
  state = {
    currentStep: 0
  };

  initialValues = {
    0: {
      [SIGN_UP_FIELDS.NAME]: '',
      [SIGN_UP_FIELDS.EMAIL]: '',
      [SIGN_UP_FIELDS.PHONE]: COUNTRY_CODE,
      [SIGN_UP_FIELDS.PASSWORD]: '',
      [SIGN_UP_FIELDS.CUIT]: ''
    }
  };

  formValidationSchema = {
    0: object().shape(fieldsValidation(inputFieldsSignUp, SIGN_UP_FIELDS)),
    1: {},
    2: {}
  };

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
        initialValues={this.initialValues}
      />
    );
  }
}

SignUpContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  error: PropTypes.shape({
    code: PropTypes.string.isRequired
  })
};

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(AuthActions.signUp(values))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpContainer);

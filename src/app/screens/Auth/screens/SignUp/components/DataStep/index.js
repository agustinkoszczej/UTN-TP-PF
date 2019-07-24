import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'yup';
import { COUNTRY_CODE } from '@constants/user';
import Routes from '@constants/routes';
import AuthActions from '@redux/auth/actions';
import { fieldsValidation } from '@utils/validations';

import SignUp from './layout';
import { SIGN_UP_FIELDS, inputFieldsSignUp } from './constants';

class SignUpContainer extends Component {
  state = { emailError: '', cuitError: '' };

  initialValues = {
    [SIGN_UP_FIELDS.NAME]: '',
    [SIGN_UP_FIELDS.EMAIL]: '',
    [SIGN_UP_FIELDS.PHONE]: COUNTRY_CODE,
    [SIGN_UP_FIELDS.PASSWORD]: '',
    [SIGN_UP_FIELDS.CUIT]: ''
  };

  formValidationSchema = object().shape(fieldsValidation(inputFieldsSignUp, SIGN_UP_FIELDS));

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.showError(error);
    }
  }

  handleEmailChange = () => {
    const { emailError } = this.state;
    if (emailError) this.clearError();
  };

  handleCUITChange = () => {
    const { cuitError } = this.state;
    if (cuitError) this.clearError();
  };

  gotoLogIn = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.Login);
  };

  handleSignUp = values => {
    const { signUp } = this.props;
    signUp(values);
  };

  render() {
    const { emailError, cuitError } = this.state;
    return (
      <SignUp
        initialValues={this.initialValues}
        gotoLogIn={this.gotoLogIn}
        onSignUp={this.handleSignUp}
        onEmailChange={this.handleEmailChange}
        onCUITChange={this.handleCUITChange}
        validationSchema={this.formValidationSchema}
        emailError={emailError}
        cuitError={cuitError}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  loading: state.auth.registeredUserLoading,
  error: state.auth.registeredUserError
});

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(AuthActions.signUp(values))
});

SignUpContainer.propTypes = {
  signUp: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  error: PropTypes.shape({
    code: PropTypes.string.isRequired
  })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);

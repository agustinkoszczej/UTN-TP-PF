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
  state = { emailError: '' };

  initialValues = {
    [SIGN_UP_FIELDS.NAME]: '',
    [SIGN_UP_FIELDS.EMAIL]: '',
    [SIGN_UP_FIELDS.PHONE]: COUNTRY_CODE,
    [SIGN_UP_FIELDS.PASSWORD]: ''
  };

  formValidationSchema = object().shape(fieldsValidation(inputFieldsSignUp));

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

  gotoLogIn = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.Login);
  };

  handleOrderAsAGuest = () => {
    const { navigation } = this.props;
    navigation.navigate({ routeName: Routes.EnterAddress });
  };

  handleSignUp = values => {
    const { signUp } = this.props;
    signUp(values);
  };

  render() {
    const { emailError, otherError } = this.state;
    return (
      <SignUp
        initialValues={this.initialValues}
        gotoLogIn={this.gotoLogIn}
        onOrderAsAGuest={this.handleOrderAsAGuest}
        onSignUp={this.handleSignUp}
        onEmailChange={this.handleEmailChange}
        validationSchema={this.formValidationSchema}
        emailError={emailError}
        otherError={otherError}
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

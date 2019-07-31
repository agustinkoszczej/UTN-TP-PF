import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, string } from 'yup';
import Routes from '@constants/routes';
import AuthActions from '@redux/auth/actions';

import { LOGIN_FIELDS, apiErrors } from './constants';
import Login from './layout';

class LoginContainer extends Component {
  EMPTY_STRING = '';

  state = { credentialsError: this.EMPTY_STRING };

  initialValues = {
    [LOGIN_FIELDS.USERNAME]: this.EMPTY_STRING,
    [LOGIN_FIELDS.PASSWORD]: this.EMPTY_STRING
  };

  validationSchema = object().shape({
    [LOGIN_FIELDS.USERNAME]: string()
      .email('Email invalido')
      .required('Campo requerido'),
    [LOGIN_FIELDS.PASSWORD]: string().required('Campo requerido')
  });

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.showError(error);
    }
  }

  showError = error => {
    const errorMessage = apiErrors(error?.internalCode);
    this.setState({ credentialsError: errorMessage });
  };

  handleLogin = values => {
    const { login } = this.props;
    login(values);
  };

  handleInputChange = () => {
    const { credentialsError } = this.state;
    if (credentialsError) this.clearError();
  };

  gotoSignUp = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.SignUp);
  };

  gotoRecoverPassword = email => {
    const { navigation } = this.props;
    navigation.navigate(Routes.RecoverPassword, { email });
  };

  clearError = () => {
    this.setState({ credentialsError: this.EMPTY_STRING });
  };

  render() {
    const { credentialsError } = this.state;
    return (
      <Login
        onLogin={this.handleLogin}
        gotoSignUp={this.gotoSignUp}
        gotoRecoverPassword={this.gotoRecoverPassword}
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        credentialsError={credentialsError}
        onInputChange={this.handleInputChange}
        {...this.props}
      />
    );
  }
}

LoginContainer.propTypes = {
  loading: PropTypes.bool,
  login: PropTypes.func.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string
  }),
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => ({
  loading: state.auth.currentUserLoading,
  currentUser: state.auth.currentUser,
  error: state.auth.currentUserError
});

const mapDispatchToProps = dispatch => ({
  login: values => dispatch(AuthActions.login(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

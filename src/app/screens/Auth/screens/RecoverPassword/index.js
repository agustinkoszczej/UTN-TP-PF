import React, { Component } from 'react';
import { object, string } from 'yup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthActions from '@redux/auth/actions';

import RecoverPassword from './layout';
import { strings, RECOVER_PASSWORD_FIELDS } from './constants';

class RecoverPasswordContainer extends Component {
  EMPTY_STRING = '';

  state = { emailError: this.EMPTY_STRING };

  initialValues = {
    [RECOVER_PASSWORD_FIELDS.EMAIL]: this.props.navigation.getParam('email') // eslint-disable-line react/destructuring-assignment
  };

  validationSchema = object().shape({
    [RECOVER_PASSWORD_FIELDS.EMAIL]: string()
      .email(strings.emailValidation)
      .required('Campo requerido')
  });

  handleInputChange = () => {
    const { emailError } = this.state;
    if (emailError) {
      this.clearError();
    }
  };

  handleRecoverPassword = ({ email }) => {
    const { recoverPassword } = this.props;
    recoverPassword(email);
  };

  render() {
    const { emailError } = this.state;
    return (
      <RecoverPassword
        {...this.props}
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onRecoverPassword={this.handleRecoverPassword}
        onInputChange={this.handleInputChange}
        emailError={emailError}
      />
    );
  }
}

RecoverPasswordContainer.propTypes = {
  navigation: PropTypes.shape({ getParam: PropTypes.func.isRequired }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  recoverPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.recoverPasswordLoading,
  error: state.auth.recoverPasswordError
});

const mapDispatchToProps = dispatch => ({
  recoverPassword: email => dispatch(AuthActions.recoverPassword(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoverPasswordContainer);

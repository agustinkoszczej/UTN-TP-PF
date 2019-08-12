import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object, string, number } from 'yup';
import { connect } from 'react-redux';
import { dataValidation, authValidation } from '@utils/validations';
import Routes from '@constants/routes';
import { COUNTRY_CODE } from '@constants/user';
import AuthActions from '@redux/auth/actions';

import { SIGN_UP_FIELDS, authFieldsSignUp, inputFieldsSignUp } from './constants';
import SignUp from './layout';

class SignUpContainer extends Component {
  state = {
    currentStep: 0
  };

  initialValues = {
    [SIGN_UP_FIELDS.EMAIL]: '',
    [SIGN_UP_FIELDS.PASSWORD]: '',
    [SIGN_UP_FIELDS.NAME]: '',
    [SIGN_UP_FIELDS.PHONE]: COUNTRY_CODE,
    [SIGN_UP_FIELDS.CUIT]: '',
    [SIGN_UP_FIELDS.ADDRESS]: '',
    [SIGN_UP_FIELDS.STREET_NUMBER]: null,
    [SIGN_UP_FIELDS.QR_URL]: 'http://qr.afip.gob.ar/?qr=7ynzfbEsT3bJi2hL6MRo6w,,',
    [SIGN_UP_FIELDS.COMPANY_NAME]: '',
    [SIGN_UP_FIELDS.LOCATION]: ''
  };

  formValidationSchema = {
    0: object().shape(authValidation(authFieldsSignUp, SIGN_UP_FIELDS)),
    1: object().shape(dataValidation(inputFieldsSignUp, SIGN_UP_FIELDS)),
    2: object().shape({
      [SIGN_UP_FIELDS.LOCATION]: string().required('Campo requerido'),
      [SIGN_UP_FIELDS.ADDRESS]: string().required('Campo requerido'),
      [SIGN_UP_FIELDS.STREET_NUMBER]: number().required('Debe seleccionar una dirección fija')
    }),
    3: object().shape({
      [SIGN_UP_FIELDS.QR_URL]: string().required('Campo requerido')
    })
  };

  handleGotoLogIn = () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.Login);
  };

  handleNext = () => this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));

  handleSignUp = values => {
    const { signUp } = this.props;
    signUp(values);
  };

  render() {
    const { currentStep } = this.state;
    const { loading } = this.props;
    return (
      <SignUp
        currentStep={currentStep}
        onNext={this.handleNext}
        onGoToLogin={this.handleGotoLogIn}
        validationSchema={this.formValidationSchema}
        initialValues={this.initialValues}
        onSignUp={this.handleSignUp}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.signUpUserLoading,
  error: state.auth.signUpUserError
});

SignUpContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  error: PropTypes.shape({
    code: PropTypes.string.isRequired
  }),
  signUp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(AuthActions.signUp(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object, string, number } from 'yup';
import { connect } from 'react-redux';
import { dataValidation, authValidation } from '@utils/validations';
import Routes from '@constants/routes';
import { COUNTRY_CODE } from '@constants/user';
import AuthActions from '@redux/auth/actions';

import { SIGN_UP_FIELDS, authFieldsSignUp, inputFieldsSignUp, LOCATION_FIELDS } from './constants';
import SignUp from './layout';

class SignUpContainer extends Component {
  state = {
    currentStep: 0
  };

  initialValues = {
    0: {
      [SIGN_UP_FIELDS.EMAIL]: '',
      [SIGN_UP_FIELDS.PASSWORD]: ''
    },
    1: {
      [SIGN_UP_FIELDS.NAME]: '',
      [SIGN_UP_FIELDS.PHONE]: COUNTRY_CODE,
      [SIGN_UP_FIELDS.CUIT]: ''
    },
    2: {
      [SIGN_UP_FIELDS.LOCATION]: {
        [LOCATION_FIELDS.LATITUDE]: '',
        [LOCATION_FIELDS.LONGITUDE]: '',
        [LOCATION_FIELDS.ADDRESS]: '',
        [LOCATION_FIELDS.STREET_NUMBER]: ''
      }
    }
  };

  formValidationSchema = {
    0: object().shape(authValidation(authFieldsSignUp, SIGN_UP_FIELDS)),
    1: object().shape(dataValidation(inputFieldsSignUp, SIGN_UP_FIELDS)),
    2: object().shape({
      [SIGN_UP_FIELDS.LOCATION]: object().shape({
        [LOCATION_FIELDS.ADDRESS]: string().required('Campo requerido'),
        [LOCATION_FIELDS.STREET_NUMBER]: number().required('Debe seleccionar una dirección fija')
      })
    }),
    3: {}
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
    return (
      <SignUp
        currentStep={currentStep}
        onNext={this.handleNext}
        onGoToLogin={this.handleGotoLogIn}
        validationSchema={this.formValidationSchema}
        initialValues={this.initialValues}
        onSignUp={this.handleSignUp}
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
  }),
  signUp: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(AuthActions.signUp(values))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpContainer);

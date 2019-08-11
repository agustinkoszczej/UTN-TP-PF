import React, { Component } from 'react';
import { object, string, number } from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dataValidation, updateValidation } from '@utils/validations';
import { SIGN_UP_FIELDS, inputFieldsSignUp, authFieldsSignUp } from '@screens/Auth/screens/SignUp/constants';
import AuthActions from '@redux/auth/actions';
import { navigationModel } from '@propTypes/navigationModel';
import { userModel } from '@propTypes/userModel';

import { TYPES } from '../../constants';

import Configuration from './layout';

class CongigurationContainer extends Component {
  formValidationSchema = {
    [TYPES.USER]: object().shape(updateValidation(authFieldsSignUp, SIGN_UP_FIELDS)),
    [TYPES.COMPANY]: object().shape(dataValidation(inputFieldsSignUp, SIGN_UP_FIELDS)),
    [TYPES.LOCATION]: object().shape({
      [SIGN_UP_FIELDS.LOCATION]: string().required('Campo requerido'),
      [SIGN_UP_FIELDS.ADDRESS]: string().required('Campo requerido'),
      [SIGN_UP_FIELDS.STREET_NUMBER]: number().required('Debe seleccionar una dirección fija')
    }),
    [TYPES.QR]: {}
  };

  handleUpdateUser = values => {
    const { updateUser } = this.props;
    updateUser(values);
  };

  render() {
    const {
      navigation: {
        state: {
          params: { type }
        }
      },
      currentUser
    } = this.props;
    return (
      <Configuration
        onUpdate={this.handleUpdateUser}
        initialValues={currentUser}
        validationSchema={this.formValidationSchema[type]}
        type={type}
      />
    );
  }
}

CongigurationContainer.propTypes = {
  updateUser: PropTypes.func.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired,
  currentUser: PropTypes.shape(userModel).isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  updateUser: values => dispatch(AuthActions.updateUser(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CongigurationContainer);

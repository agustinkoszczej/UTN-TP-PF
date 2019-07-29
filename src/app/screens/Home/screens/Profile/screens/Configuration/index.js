import React, { Component } from 'react';
import { object } from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dataValidation } from '@utils/validations';
import { COUNTRY_CODE } from '@constants/user';
import { SIGN_UP_FIELDS, inputFieldsSignUp } from '@screens/Auth/screens/SignUp/constants';
import AuthActions from '@redux/auth/actions';

import Configuration from './layout';

class CongigurationContainer extends Component {
  initialValues = {
    [SIGN_UP_FIELDS.NAME]: '',
    [SIGN_UP_FIELDS.PHONE]: COUNTRY_CODE,
    [SIGN_UP_FIELDS.CUIT]: ''
  };

  formValidationSchema = object().shape(dataValidation(inputFieldsSignUp, SIGN_UP_FIELDS));

  handleUpdateUser = values => {
    const { updateUser } = this.props;
    updateUser(values);
  };

  render() {
    return (
      <Configuration
        onUpdate={this.handleUpdateUser}
        initialValues={this.initialValues}
        validationSchema={this.formValidationSchema}
      />
    );
  }
}

CongigurationContainer.propTypes = {
  updateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateUser: values => dispatch(AuthActions.updateUser(values))
});

export default connect(
  null,
  mapDispatchToProps
)(CongigurationContainer);

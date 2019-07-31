import { View } from 'react-native';
import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import BaseForm from '@components/BaseForm';
import CompanyDataStep from '@screens/Auth/screens/SignUp/components/CompanyDataStep';
import UserDataStep from '@screens/Auth/screens/SignUp/components/UserDataStep';
import { SIGN_UP_FIELDS } from '@screens/Auth/screens/SignUp/constants';

import styles from './styles';

function Configuration({ handleSubmit, values, setFieldValue }) {
  return (
    <View style={styles.container}>
      <BaseForm showButton onSubmit={handleSubmit}>
        <CompanyDataStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />
        <UserDataStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />
      </BaseForm>
    </View>
  );
}

Configuration.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [SIGN_UP_FIELDS.NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.PHONE]: PropTypes.string,
    [SIGN_UP_FIELDS.CUIT]: PropTypes.string
  })
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema }) => validationSchema,
    handleSubmit: (values, { props }) => props.onUpdate(values)
  })
);

export default enhancer(Configuration);

import { View } from 'react-native';
import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import BaseForm from '@components/BaseForm';
import CompanyDataStep from '@screens/Auth/screens/SignUp/components/CompanyDataStep';
import UserDataStep from '@screens/Auth/screens/SignUp/components/UserDataStep';
import LocationStep from '@screens/Auth/screens/SignUp/components/LocationStep';
import QRStep from '@screens/Auth/screens/SignUp/components/QRStep';
import { SIGN_UP_FIELDS } from '@screens/Auth/screens/SignUp/constants';

import { TYPES } from '../../constants';

import styles from './styles';

function Configuration({ handleSubmit, values, setFieldValue, type, loading }) {
  return (
    <View style={styles.container}>
      <BaseForm showButton primaryBtn textStyle={styles.white} onSubmit={handleSubmit} loading={loading}>
        {
          {
            [TYPES.COMPANY]: (
              <CompanyDataStep handleSubmit={handleSubmit} values={values} setFieldValue={setFieldValue} />
            ),
            [TYPES.USER]: <UserDataStep handleSubmit={handleSubmit} values={values} update />,
            [TYPES.QR]: <QRStep setFieldValue={setFieldValue} handleSubmit={handleSubmit} />,
            [TYPES.LOCATION]: <LocationStep setFieldValue={setFieldValue} values={values} />
          }[type]
        }
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
  }),
  type: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema }) => validationSchema,
    handleSubmit: (values, { props }) => props.onUpdate(values)
  })
);

export default enhancer(Configuration);

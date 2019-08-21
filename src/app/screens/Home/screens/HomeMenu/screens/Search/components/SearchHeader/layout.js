import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import CustomTextInput from '@components/CustomTextInput';
import CustomButton from '@components/CustomButton';
import BaseForm from '@components/BaseForm';
import { View } from 'react-native';

import styles from './styles';

function SearchHeader({ handleSubmit }) {
  return (
    <View style={styles.container}>
      <BaseForm>
        <View style={styles.header}>
          <CustomTextInput
            placeholder="Busqueda"
            applyTrim
            underline
            returnKeyType="go"
            autoCapitalize="none"
            style={styles.input}
          />
          <CustomButton
            primaryBtn
            title="Buscar"
            onPress={handleSubmit}
            textStyle={styles.white}
            style={styles.button}
          />
        </View>
      </BaseForm>
    </View>
  );
}

SearchHeader.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const enhancer = compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    validationSchema: ({ validationSchema }) => validationSchema,
    handleSubmit: (values, { props }) => props.onUpdate(values)
  })
);

export default enhancer(SearchHeader);

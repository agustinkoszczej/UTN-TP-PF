import React from 'react';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View } from 'react-native';
import { FormField as CustomTextInput } from '@components/CustomTextInput';
import CustomButton from '@components/CustomButton';
import BaseForm from '@components/BaseForm';
import userIconOn from '@components/TabBarIcon/assets/ic_user_on.png';
import userIconOff from '@components/TabBarIcon/assets/ic_user_off.png';
import productIconOn from '@assets/ic_product_on.png';
import productIconOff from '@assets/ic_product_off.png';

import SearchResults from './components/SearchResults';
import styles from './styles';
import { STATES_SELECTED } from './constants';

function Search({ handleSubmit, selected, handleTypeChange }) {
  const isSupplierSelected = selected === STATES_SELECTED.SUPPLIER;
  const isProductSelected = selected === STATES_SELECTED.PRODUCT;
  return (
    <>
      <View style={styles.container}>
        <BaseForm>
          <View style={styles.header}>
            <CustomTextInput
              placeholder="Busqueda"
              applyTrim
              underline
              returnKeyType="go"
              autoCapitalize="none"
              name="search"
              onTextSubmitEditing={handleSubmit}
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
          <View style={styles.buttonsHeader}>
            <CustomButton
              secondaryBtn
              icon={isSupplierSelected ? userIconOn : userIconOff}
              iconStyle={styles.iconStyle}
              title="Distribuidores"
              onPress={handleTypeChange(STATES_SELECTED.SUPPLIER)}
              style={[styles.typeButton, isSupplierSelected && styles.blackBorder]}
            />
            <CustomButton
              secondaryBtn
              icon={isProductSelected ? productIconOn : productIconOff}
              title="Productos"
              onPress={handleTypeChange(STATES_SELECTED.PRODUCT)}
              iconStyle={styles.iconStyle}
              style={[styles.typeButton, isProductSelected && styles.blackBorder]}
            />
          </View>
        </BaseForm>
      </View>
      <SearchResults selected={selected} />
    </>
  );
}

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
};

const enhancer = compose(
  withFormik({
    handleSubmit: (values, { props }) => props.handleSearch(values)
  })
);

export default enhancer(Search);

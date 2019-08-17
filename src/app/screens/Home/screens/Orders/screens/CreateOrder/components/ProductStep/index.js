import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Text } from 'react-native';
import AuthActions from '@redux/auth/actions';

import { CREATE_ORDER_FIELDS } from '../../constants';

class ProductStep extends Component {
  componentDidMount() {
    const { values, getSupplierProducts } = this.props;
    getSupplierProducts(values[CREATE_ORDER_FIELDS.SUPPLIER_ID]);
  }

  render() {
    return <Text>Hola</Text>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getSupplierProducts: id => dispatch(AuthActions.getSupplierProducts(id))
});

ProductStep.propTypes = {
  getSupplierProducts: PropTypes.func.isRequired
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(ProductStep);

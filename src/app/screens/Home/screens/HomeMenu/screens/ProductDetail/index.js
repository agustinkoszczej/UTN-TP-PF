import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Loadable from '@components/Loadable';

import ProductDetailHeader from './components/ProductDetailHeader';
import ProductDetailSuppliers from './components/ProductDetailSuppliers';

class ProductDetail extends Component {
  render() {
    const {
      product: { product, suppliers }
    } = this.props;
    return (
      <>
        <ProductDetailHeader product={product} />
        <ProductDetailSuppliers suppliers={suppliers} />
      </>
    );
  }
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    product: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    suppliers: PropTypes.arrayOf(PropTypes.shape)
  })
};

const mapStateToProps = state => ({
  product: state.product.currentProduct,
  loading: state.product.currentProductLoading
});

const enhance = compose(
  withNavigation,
  connect(mapStateToProps),
  Loadable(props => props.loading)
);

export default enhance(ProductDetail);

import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import ProductActions from '@redux/product/actions';
import { navigationModel } from '@propTypes/navigationModel';

class ProductDetail extends Component {
  componentDidMount() {
    const {
      getProductById,
      navigation: {
        state: { id }
      }
    } = this.props;
    getProductById(id);
  }

  render() {
    return <Text>Hola</Text>;
  }
}

ProductDetail.propTypes = {
  getProductById: PropTypes.func.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired
};

const mapStateToProps = state => ({
  product: state.product.currentProduct
});

const mapDispatchToProps = dispatch => ({
  getProductById: id => dispatch(ProductActions.getProductById(id))
});

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(ProductDetail);

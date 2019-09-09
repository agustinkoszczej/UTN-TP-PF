import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { FlatList, View, Image } from 'react-native';
import ProductsActions from '@redux/product/actions';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';

import { CREATE_ORDER_FIELDS } from '../../constants';

import styles from './styles';

class ProductStep extends Component {
  componentDidMount() {
    const { values, getSupplierProducts } = this.props;
    getSupplierProducts(values[CREATE_ORDER_FIELDS.SUPPLIER_ID]);
  }

  handleProductChange = ({ id, imageUrl, description }, add) => () => {
    const { setFieldValue, values } = this.props;
    let products = values[CREATE_ORDER_FIELDS.PRODUCTS];
    const product = products.find(prod => prod.id === id);
    if (!product) {
      if (add) {
        products = [...products, { id, quantity: 1, product: { imageUrl, description } }];
      }
    } else {
      const quantity = add ? product.quantity + 1 : product.quantity - 1;
      if (!quantity) {
        products = products.filter(prod => prod.id !== id);
      } else {
        products = products.map(prod =>
          prod.id === id ? { id, quantity, product: { imageUrl, description } } : prod
        );
      }
    }
    setFieldValue(CREATE_ORDER_FIELDS.PRODUCTS, products);
  };

  renderItem = ({ item: { product } }) => {
    const { values } = this.props;
    const { id, imageUrl, description } = product;
    const quantity = values[CREATE_ORDER_FIELDS.PRODUCTS].find(prod => prod.id === id)?.quantity || 0;
    return (
      <Card style={styles.productContainer}>
        <View style={styles.row}>
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
          <CustomText>{description}</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText>{quantity}</CustomText>
          <CustomButton
            style={styles.rightButton}
            textStyle={styles.buttonFont}
            title="+"
            onPress={this.handleProductChange(product, true)}
          />
          <CustomButton
            style={styles.rightButton}
            textStyle={styles.buttonFont}
            title="-"
            onPress={this.handleProductChange(product)}
          />
        </View>
      </Card>
    );
  };

  keyExtractor = ({ product: { id } }) => `${id}`;

  render() {
    const { catalog } = this.props;
    return (
      <FlatList
        data={catalog}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        extraData={this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  catalog: state.product.catalog
});

const mapDispatchToProps = dispatch => ({
  getSupplierProducts: id => dispatch(ProductsActions.getSupplierProducts(id))
});

ProductStep.propTypes = {
  getSupplierProducts: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    [CREATE_ORDER_FIELDS.PRODUCTS]: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
      })
    )
  }).isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape({}))
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(ProductStep);

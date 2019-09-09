import React, { Component } from 'react';
import { View, FlatList, Image, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductActions from '@redux/product/actions';
import CustomTextInput from '@components/CustomTextInput';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';

import { CREATE_AUCTIONS_FIELDS } from '../../constants';

import styles from './styles';

class ProductStep extends Component {
  state = { name: '' };

  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  handleTextSubmit = () => {
    const { getProducts } = this.props;
    const { name } = this.state;
    getProducts(name);
  };

  handleInputChange = name => this.setState({ name });

  handleProductChange = ({ id, image_url: imageUrl, description }, add) => () => {
    const { setFieldValue, values } = this.props;
    let products = values[CREATE_AUCTIONS_FIELDS.PRODUCTS];
    const product = products.find(prod => prod.id === id);
    if (!product) {
      if (add) {
        products = [...products, { id, quantity: 1, imageUrl, description }];
      }
    } else {
      const quantity = add ? product.quantity + 1 : product.quantity - 1;
      if (!quantity) {
        products = products.filter(prod => prod.id !== id);
      } else {
        products = products.map(prod => (prod.id === id ? { id, quantity, imageUrl, description } : prod));
      }
    }
    setFieldValue(CREATE_AUCTIONS_FIELDS.PRODUCTS, products);
  };

  renderItem = ({ item }) => {
    const { values } = this.props;
    const { id, image_url: imageUrl, description } = item;
    const quantity = values[CREATE_AUCTIONS_FIELDS.PRODUCTS].find(prod => prod.id === id)?.quantity || 0;
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
            onPress={this.handleProductChange(item, true)}
          />
          <CustomButton
            style={styles.rightButton}
            textStyle={styles.buttonFont}
            title="-"
            onPress={this.handleProductChange(item)}
          />
        </View>
      </Card>
    );
  };

  keyExtractor = ({ user_id: userId }) => `${userId}`;

  render() {
    const { name } = this.state;
    const { products, loading } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <CustomTextInput
            placeholder="Producto"
            style={styles.formElement}
            autoCapitalize="words"
            returnKeyType="go"
            onTextSubmitEditing={this.handleTextSubmit}
            underline
            onChange={this.handleInputChange}
            value={name}
          />
          <CustomButton
            primaryBtn
            textStyle={styles.white}
            onPress={this.handleTextSubmit}
            title="Buscar"
            style={styles.search}
          />
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={products}
            extraData={this.props}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
      </View>
    );
  }
}

ProductStep.propTypes = {
  getProducts: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({}),
  products: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  products: state.product.catalog,
  loading: state.product.catalogLoading
});

const mapDispatchToProps = dispatch => ({
  getProducts: string => dispatch(ProductActions.getProducts(string))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductStep);

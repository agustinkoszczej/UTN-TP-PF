import React, { Component } from 'react';
import { FlatList, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import SeparatorWithText from '@components/SeparatorWithText';

import styles from './styles';

class AuctionProducts extends Component {
  renderItem = ({ item: { quantity, product, description, imageUrl } }) => (
    <View style={styles.productContainer}>
      <View style={styles.productInfo}>
        <Image source={{ uri: product?.imageUrl || imageUrl }} style={styles.productImage} />
        <CustomText bold>{product?.description || description}</CustomText>
      </View>
      <CustomText>{quantity}</CustomText>
    </View>
  );

  renderSeparator = () => <SeparatorWithText text="Productos" />;

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { products } = this.props;
    return (
      <Card style={styles.cardContainer}>
        <FlatList
          data={products}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderSeparator}
          keyExtractor={this.keyExtractor}
        />
      </Card>
    );
  }
}

AuctionProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired,
      product: PropTypes.shape({
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
      })
    })
  ).isRequired
};

export default AuctionProducts;

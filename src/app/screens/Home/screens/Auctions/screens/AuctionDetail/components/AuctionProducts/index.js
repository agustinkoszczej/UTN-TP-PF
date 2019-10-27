import React, { Component } from 'react';
import { FlatList, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import tickAsset from '@assets/tick.png';
import SeparatorWithText from '@components/SeparatorWithText';

import styles from './styles';

class AuctionProducts extends Component {
  renderItem = ({ item: { quantity, product, description, imageUrl, status } }) => (
    <View style={styles.productContainer}>
      <View style={styles.productInfo}>
        <Image source={{ uri: product?.imageUrl || imageUrl }} style={styles.productImage} />
        <CustomText
          bold
          textProps={{ numberOfLines: 1 }}
          style={{ marginRight: 20, overflow: 'hidden', width: 175 }}
        >
          {product?.description || description}
        </CustomText>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {status === 'CONFIRMED' && <Image source={tickAsset} style={styles.productImage} />}
        <CustomText>{quantity}</CustomText>
      </View>
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

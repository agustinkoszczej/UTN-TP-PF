import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import CustomText from '@components/CustomText';

import styles from './styles';

function ProductDetailHeader({
  product: {
    imageUrl,
    description,
    category: { description: categoryDescription }
  }
}) {
  return (
    <View style={styles.container}>
      <View style={styles.productHeader}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <CustomText bold title style={styles.title}>
          {description}
        </CustomText>
      </View>
      <View style={styles.categorySection}>
        <CustomText bold style={styles.categoryPlaceholder}>Categoría:</CustomText>
        <CustomText style={styles.category}>{categoryDescription}</CustomText>
      </View>
    </View>
  );
}

ProductDetailHeader.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.shape({
      description: PropTypes.string.isRequired
    })
  })
};

export default ProductDetailHeader;

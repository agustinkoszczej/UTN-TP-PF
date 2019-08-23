import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import CustomText from '@components/CustomText';

import styles from './styles';

function ProductDetailHeader({ product: { imageUrl, description } }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <CustomText title style={styles.title}>
        {description}
      </CustomText>
    </View>
  );
}

ProductDetailHeader.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

export default ProductDetailHeader;

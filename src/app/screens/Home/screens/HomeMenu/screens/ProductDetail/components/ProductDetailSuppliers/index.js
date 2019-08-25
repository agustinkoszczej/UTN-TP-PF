import React, { Component } from 'react';
import { View, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';

import styles from './styles';

class ProductDetailSuppliers extends Component {
  renderItem = ({ item: { fullName, id, picture } }) => (
    <Card style={styles.supplierContainer}>
      <View style={styles.infoSupplier}>
        <Image source={{ uri: picture }} style={styles.image} />
        <CustomText>{fullName}</CustomText>
      </View>
      <CustomButton
        primaryBtn
        textStyle={styles.white}
        style={styles.button}
        title="Ver"
        onPress={this.handleGoToProfile(id)}
      />
    </Card>
  );

  handleGoToProfile = id => () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.SupplierProfile, { id });
  };

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { suppliers } = this.props;
    return (
      <View style={styles.container}>
        <CustomText style={styles.title}>Distribuidores</CustomText>
        <FlatList data={suppliers} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      </View>
    );
  }
}

ProductDetailSuppliers.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  suppliers: PropTypes.arrayOf(PropTypes.shape({}))
};

export default withNavigation(ProductDetailSuppliers);

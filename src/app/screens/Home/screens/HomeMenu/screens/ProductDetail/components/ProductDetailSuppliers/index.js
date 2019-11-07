import React, { Component } from 'react';
import { View, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import AuthActions from '@redux/auth/actions';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';

import styles from './styles';

class ProductDetailSuppliers extends Component {
  renderItem = ({ item }) => {
    const { fullName, picture, id } = item;
    return (
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
  };

  handleGoToProfile = id => () => {
    const { navigation, getSupplierById } = this.props;
    getSupplierById(id);
    navigation.navigate(Routes.SupplierProfile);
  };

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { suppliers } = this.props;
    return (
      <View style={styles.container}>
        <CustomText bold style={styles.title}>Distribuidores</CustomText>
    {suppliers.length === 0 && (<CustomText >No posee distribuidores con este producto</CustomText>)}
          <FlatList data={suppliers} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />

        
      </View>
    );
  }
}

ProductDetailSuppliers.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  suppliers: PropTypes.arrayOf(PropTypes.shape({})),
  getSupplierById: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getSupplierById: id => dispatch(AuthActions.getSupplierById(id))
});

const enhancer = compose(
  withNavigation,
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhancer(ProductDetailSuppliers);

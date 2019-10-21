import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNavigation } from 'react-navigation';
import { FlatList, Image, View } from 'react-native';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import { navigationModel } from '@propTypes/navigationModel';
import ProductActions from '@redux/product/actions';
import AuthActions from '@redux/auth/actions';
import Routes from '@constants/routes';
import WithError from '@components/WithError';
import worried from '@assets/worried.png';

import { STATES_SELECTED } from '../../constants';

import styles from './styles';

class SearchResults extends Component {
  renderItem = ({ item }) => {
    const { description, image_url: imageUrl, picture, fullName, companyName } = item;
    const image = imageUrl || picture;
    const text = description || `${fullName} (${companyName})`;
    return (
      <Card style={styles.itemContainer}>
        <View style={styles.info}>
          <Image source={{ uri: image }} style={styles.itemImage} />
          <CustomText>{text}</CustomText>
        </View>
        <CustomButton
          title="Ver"
          primaryBtn
          onPress={this.handleItemPress(item)}
          style={styles.button}
          textStyle={styles.white}
        />
      </Card>
    );
  };

  handleItemPress = item => () => {
    const { navigation, getProductById, selected, getSupplierById } = this.props;
    let route;
    if (selected === STATES_SELECTED.PRODUCT) {
      route = Routes.ProductDetail;
      getProductById(item.id);
    } else {
      getSupplierById(item.user_id);
      route = Routes.SupplierProfile;
    }
    navigation.navigate(route);
  };

  keyExtractor = ({ id, user_id: userId }) => `${id || userId}`;

  render() {
    const { catalog, loading, selected, users } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={selected === STATES_SELECTED.PRODUCT ? catalog : users}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        refreshing={loading}
      />
    );
  }
}

SearchResults.propTypes = {
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired,
  catalog: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired
    })
  ),
  selected: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  getProductById: PropTypes.func.isRequired,
  getSupplierById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  catalog: state.product.catalog,
  users: state.auth.suppliers,
  loading: state.product.catalogLoading || state.auth.suppliersLoading
});

const mapDispatchToProps = dispatch => ({
  getProductById: id => dispatch(ProductActions.getProductById(id)),
  getSupplierById: id => dispatch(AuthActions.getSupplierById(id))
});

const enhancer = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  WithError(
    ({ error, catalog, selected, users }) =>
      error || (selected === STATES_SELECTED.PRODUCT ? !catalog.length : !users.length),
    ({ catalog, users, selected, loading }) => ({
      asset: (selected === STATES_SELECTED.PRODUCT ? !catalog.length : !users.length) ? worried : undefined,
      title: (selected === STATES_SELECTED.PRODUCT
      ? !catalog.length
      : !users.length)
        ? 'No se encuentran resultados que concuerden con la busqueda actual'
        : undefined,
      loading
    })
  )
);

export default enhancer(SearchResults);

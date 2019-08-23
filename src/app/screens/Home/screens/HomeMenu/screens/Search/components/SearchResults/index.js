import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNavigation } from 'react-navigation';
import { FlatList, Image, View } from 'react-native';
import ProductActions from '@redux/product/actions';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';
import Card from '@components/Card';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';
import WithError from '@components/WithError';
import worried from '@assets/worried.png';

import styles from './styles';

class SearchResults extends Component {
  componentWillUnmount() {
    const { clearCatalog } = this.props;
    clearCatalog();
  }

  renderItem = ({ item: { description, id, image_url: image } }) => (
    <Card style={styles.itemContainer}>
      <View style={styles.info}>
        <Image source={{ uri: image }} style={styles.itemImage} />
        <CustomText>{description}</CustomText>
      </View>
      <CustomButton
        title="Ver"
        primaryBtn
        onPress={this.handleItemPress(id)}
        style={styles.button}
        textStyle={styles.white}
      />
    </Card>
  );

  handleItemPress = id => () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.ProductDetail, { id });
  };

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { catalog, loading } = this.props;
    return (
      <FlatList
        style={styles.container}
        data={catalog}
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
  clearCatalog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  catalog: state.product.catalog,
  loading: state.product.catalogLoading
});

const mapDispatchToProps = dispatch => ({
  getProducts: values => dispatch(ProductActions.getProducts(values)),
  clearCatalog: () => dispatch(ProductActions.clearCatalog())
});

const enhancer = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  WithError(
    ({ error, catalog }) => error || catalog?.length === 0,
    ({ catalog, loading }) => ({
      asset: catalog?.length === 0 ? worried : undefined,
      title: catalog?.length === 0 ? 'Realice una busqueda para obtener resultados' : undefined,
      loading
    })
  )
);

export default enhancer(SearchResults);
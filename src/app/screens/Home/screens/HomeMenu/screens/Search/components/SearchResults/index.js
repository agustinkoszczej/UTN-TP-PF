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
import Routes from '@constants/routes';
import WithError from '@components/WithError';
import worried from '@assets/worried.png';

import { STATES_SELECTED } from '../../constants';

import styles from './styles';

class SearchResults extends Component {
  renderItem = ({ item: { description, id, image_url: imageUrl, picture, fullName, companyName } }) => {
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
          onPress={this.handleItemPress(id)}
          style={styles.button}
          textStyle={styles.white}
        />
      </Card>
    );
  };

  handleItemPress = id => () => {
    const { navigation } = this.props;
    navigation.navigate(Routes.ProductDetail, { id });
  };

  keyExtractor = ({ id }) => `${id}`;

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
  users: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = state => ({
  catalog: state.product.catalog,
  users: state.auth.agenda,
  loading: state.product.catalogLoading || state.auth.agendaLoading
});

const enhancer = compose(
  withNavigation,
  connect(mapStateToProps),
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

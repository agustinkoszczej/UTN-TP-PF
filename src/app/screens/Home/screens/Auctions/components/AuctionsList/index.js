import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import worried from '@assets/worried.png';
import WithError from '@components/WithError';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';
import AuctionsActions from '@redux/auctions/actions';

import styles from './styles';
import AuctionView from './components/AuctionView';

class AuctionsList extends Component {
  renderItem = ({ item }) => (
    <AuctionView auction={item} user={this.props.user} goToAuctionDetail={this.goToAuctionDetail} />
  );

  goToAuctionDetail = id => () => {
    const {
      navigation: { navigate },
      getAuctionById
    } = this.props;
    navigate(Routes.AuctionDetail);
    getAuctionById(id);
  };

  keyExtractor = ({ id }) => `${id}`;

  render() {
    const { auctions, loading, onRefresh } = this.props;
    return (
      <FlatList
        data={auctions}
        style={styles.container}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onRefresh={onRefresh}
        refreshing={loading}
      />
    );
  }
}

AuctionsList.propTypes = {
  auctions: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.shape(navigationModel).isRequired,
  user: PropTypes.shape({}),
  getAuctionById: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  getAuctionById: id => dispatch(AuctionsActions.getAuctionById(id))
});

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  WithError(
    ({ error, auctions }) => error || auctions?.length === 0,
    ({ auctions, loading, getAuctions, error, active, expired }) => ({
      asset: auctions?.length === 0 ? worried : undefined,
      handleError: error && getAuctions,
      title:
        auctions?.length === 0
          ? active
            ? 'No posees subastas activas'
            : expired
            ? 'No posees subastas expiradas'
            : 'No posees subastas cerradas'
          : undefined,
      loading
    })
  )
);

export default enhance(AuctionsList);

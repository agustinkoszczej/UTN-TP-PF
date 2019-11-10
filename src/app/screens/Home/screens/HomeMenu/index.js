import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { ScrollView, RefreshControl } from 'react-native';
import AuthActions from '@redux/auth/actions';
import Loadable from '@components/Loadable';
import { ORDER_STATUS } from '@constants/orderStatus';

import OrdersSection from './components/OrdersSection';
import AuctionsSection from './components/AuctionsSection';
import styles from './styles';
import BidsSection from './components/BidsSection';

class HomeMenuContainer extends Component {
  state = { refreshing: false };

  componentDidMount() {
    const { getStats } = this.props;
    getStats();
  }

  handleRefresh = () => {
    const { getStats, getAgenda } = this.props;
    getStats();
    getAgenda();
  };

  render() {
    const { stats } = this.props;
    const { refreshing } = this.state;
    const orders = stats?.orders;
    const auctions = stats?.auctions;
    const bids = stats?.bid;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />}
      >
        <OrdersSection orders={orders} />
        <AuctionsSection auctions={auctions} />
        <BidsSection bids={bids} />
      </ScrollView>
    );
  }
}

HomeMenuContainer.propTypes = {
  getStats: PropTypes.func.isRequired,
  getAgenda: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    orders: PropTypes.shape({
      [ORDER_STATUS.DELIVERED]: PropTypes.string,
      [ORDER_STATUS.CONFIRMED]: PropTypes.string,
      [ORDER_STATUS.REJECTED]: PropTypes.string,
      [ORDER_STATUS.ON_WAY]: PropTypes.string,
      [ORDER_STATUS.PENDING]: PropTypes.string,
      [ORDER_STATUS.CANCELLED]: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({
  stats: state.auth.stats,
  loading: state.auth.statsLoading
});

const mapDispatchToProps = dispatch => ({
  getStats: () => dispatch(AuthActions.getStats()),
  getAgenda: () => dispatch(AuthActions.getAgenda())
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  Loadable(props => props.loading && !props.stats)
);

export default enhance(HomeMenuContainer);

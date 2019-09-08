import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { View } from 'react-native';
import AuthActions from '@redux/auth/actions';
import Loadable from '@components/Loadable';
import { ORDER_STATUS } from '@constants/orderStatus';

import OrdersSection from './components/OrdersSection';
import AuctionsSection from './components/AuctionsSection';
import styles from './styles';

class HomeMenuContainer extends Component {
  componentDidMount() {
    const { getStats } = this.props;
    getStats();
  }

  render() {
    const { stats } = this.props;
    const orders = stats?.orders;
    const auctions = stats?.auctions;
    return (
      <View style={styles.container}>
        <OrdersSection orders={orders} />
        <AuctionsSection auctions={auctions} />
      </View>
    );
  }
}

HomeMenuContainer.propTypes = {
  getStats: PropTypes.func.isRequired,
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
  getStats: () => dispatch(AuthActions.getStats())
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  Loadable(props => props.loading && !props.stats)
);

export default enhance(HomeMenuContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthActions from '@redux/auth/actions';
import Loadable from '@components/Loadable';
import { ORDER_STATUS } from '@constants/orderStatus';

import OrdersSection from './components/OrdersSection';
import AuctionsSection from './components/AuctionsSection';

class HomeMenuContainer extends Component {
  componentDidMount() {
    const { getStats } = this.props;
    getStats();
  }

  render() {
    const { stats } = this.props;
    const orders = stats?.orders;
    return (
      <>
        <OrdersSection orders={orders} />
        <AuctionsSection />
      </>
    );
  }
}

HomeMenuContainer.propTypes = {
  getStats: PropTypes.func.isRequired,
  stats: PropTypes.shape({
    orders: PropTypes.shape({
      [ORDER_STATUS.DELIVERED]: PropTypes.number.isRequired,
      [ORDER_STATUS.CONFIRMED]: PropTypes.number.isRequired,
      [ORDER_STATUS.REJECTED]: PropTypes.number.isRequired,
      [ORDER_STATUS.ON_WAY]: PropTypes.number.isRequired,
      [ORDER_STATUS.PENDING]: PropTypes.number.isRequired,
      [ORDER_STATUS.CANCELLED]: PropTypes.number.isRequired
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
  Loadable(props => props.loading),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HomeMenuContainer);

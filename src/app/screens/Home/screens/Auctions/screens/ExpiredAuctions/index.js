import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuctionsActions from '@redux/auctions/actions';

import AuctionsList from '../../components/AuctionsList';

class ExpiredActions extends Component {
  componentDidMount() {
    const { getExpiredAuctions } = this.props;
    getExpiredAuctions();
  }

  render() {
    const { expiredAuctions, loading, error, getExpiredAuctions } = this.props;
    return (
      <AuctionsList
        loading={loading}
        error={error}
        onRefresh={getExpiredAuctions}
        getAuctions={getExpiredAuctions}
        auctions={expiredAuctions}
        expired
      />
    );
  }
}

ExpiredActions.propTypes = {
  getExpiredAuctions: PropTypes.func.isRequired,
  expiredAuctions: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({})
};

const mapStateToProps = state => ({
  loading: state.auctions.expiredAuctionsLoading,
  error: state.auctions.expiredAuctionsError,
  expiredAuctions: state.auctions.expiredAuctions?.auctions
});

const mapDispatchToProps = dispatch => ({
  getExpiredAuctions: () => dispatch(AuctionsActions.getExpiredAuctions())
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(ExpiredActions);

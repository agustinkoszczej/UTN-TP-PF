import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuctionsActions from '@redux/auctions/actions';

import AuctionsList from '../../components/AuctionsList';

class ClosedActions extends Component {
  componentDidMount() {
    const { getClosedAuctions } = this.props;
    getClosedAuctions();
  }

  render() {
    const { closedAuctions, loading, error, getClosedAuctions } = this.props;
    return (
      <AuctionsList
        loading={loading}
        error={error}
        onRefresh={getClosedAuctions}
        getAuctions={getClosedAuctions}
        auctions={closedAuctions}
        closed
      />
    );
  }
}

ClosedActions.propTypes = {
  getClosedAuctions: PropTypes.func.isRequired,
  closedAuctions: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({})
};

const mapStateToProps = state => ({
  loading: state.auctions.closedAuctionsLoading,
  error: state.auctions.closedAuctionsError,
  closedAuctions: state.auctions.closedAuctions?.auctions
});

const mapDispatchToProps = dispatch => ({
  getClosedAuctions: () => dispatch(AuctionsActions.getClosedAuctions())
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(ClosedActions);

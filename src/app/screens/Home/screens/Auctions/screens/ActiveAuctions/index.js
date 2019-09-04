import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuctionsActions from '@redux/auctions/actions';

import AuctionsList from '../../components/AuctionsList';

class ActiveAuctions extends Component {
  componentDidMount() {
    const { getActiveAuctions } = this.props;
    getActiveAuctions();
  }

  render() {
    const { activeAuctions, loading, error, getActiveAuctions } = this.props;
    return (
      <AuctionsList
        loading={loading}
        error={error}
        onRefresh={getActiveAuctions}
        getAuctions={getActiveAuctions}
        auctions={activeAuctions}
        active
      />
    );
  }
}

ActiveAuctions.propTypes = {
  getActiveAuctions: PropTypes.func.isRequired,
  activeAuctions: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.shape({})
};

const mapStateToProps = state => ({
  loading: state.auctions.activeAuctionsLoading,
  error: state.auctions.activeAuctionsError,
  activeAuctions: state.auctions.activeAuctions?.auctions
});

const mapDispatchToProps = dispatch => ({
  getActiveAuctions: () => dispatch(AuctionsActions.getActiveAuctions())
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(ActiveAuctions);

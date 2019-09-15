import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import AuctionsActions from '@redux/auctions/actions';

import AuctionDetail from './layout';

class AuctionDetailContainer extends Component {
  state = { refreshing: false };

  componentDidUpdate({ loading: prevLoading }) {
    const { loading } = this.props;
    const { refreshing } = this.state;
    if (prevLoading !== loading && !refreshing) this.handleRefresh();
  }

  handleRefresh = () => this.setState({ refreshing: true });

  refreshAuction = () => {
    const {
      auction: { id },
      getAuctionById
    } = this.props;
    getAuctionById(id);
  };

  render() {
    const { auction, loading } = this.props;
    const { refreshing } = this.state;
    return (
      <AuctionDetail
        auction={auction}
        loading={loading}
        refreshAuction={this.refreshAuction}
        refreshing={refreshing}
      />
    );
  }
}

AuctionDetailContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  auction: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
  getAuctionById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auction: state.auctions.currentAuction,
  loading: state.auctions.currentAuctionLoading
});

const mapDispatchToProps = dispatch => ({
  getAuctionById: id => dispatch(AuctionsActions.getAuctionById(id))
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(AuctionDetailContainer);

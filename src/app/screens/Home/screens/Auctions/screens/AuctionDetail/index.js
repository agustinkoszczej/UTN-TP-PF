import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AuctionDetail from './layout';

function AuctionDetailContainer({ auction, loading }) {
  return <AuctionDetail auction={auction} loading={loading} />;
}

AuctionDetailContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  auction: PropTypes.shape({})
};

const mapStateToProps = state => ({
  auction: state.auctions.currentAuction,
  loading: state.auctions.currentAuctionLoading
});

const enhance = compose(connect(mapStateToProps));

export default enhance(AuctionDetailContainer);

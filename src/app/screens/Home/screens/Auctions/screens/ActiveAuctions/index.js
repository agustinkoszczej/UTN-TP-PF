import React, { Component } from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuctionsActions from '@redux/auctions/actions';

class ActiveAuctionsContainer extends Component {
  componentDidMount() {
    const { getActiveAuctions } = this.props;
    getActiveAuctions();
  }

  render() {
    return <View />;
  }
}

ActiveAuctionsContainer.propTypes = {
  getActiveAuctions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.auctions.activeAuctionsLoading,
  activeAuctions: state.auctions.activeAuctions
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

export default enhance(ActiveAuctionsContainer);

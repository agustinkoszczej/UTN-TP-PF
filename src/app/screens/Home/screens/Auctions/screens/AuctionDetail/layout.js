import React, { Component } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { withNavigation } from 'react-navigation';
import Loadable from '@components/Loadable';
import Card from '@components/Card';
import CustomButton from '@components/CustomButton';
import CustomText from '@components/CustomText';
import { navigationModel } from '@propTypes/navigationModel';
import Routes from '@constants/routes';
import { AUCTION_STATUS } from '@constants/auctionStatus';
import { BID_STATUS } from '@constants/bidsStatus';

import styles from './styles';
import AuctionHeader from './components/AuctionHeader';
import AuctionProducts from './components/AuctionProducts';
import PaymentMethods from './components/PaymentMethods';

class AuctionDetail extends Component {
  navigateToBids = () => {
    const {
      navigation,
      bids,
      auction: { id }
    } = this.props;
    navigation.navigate({ routeName: Routes.Bids, params: { bids, auctionId: id } });
  };

  render() {
    const { auction, creation, bids, loading, refreshAuction } = this.props;
    return (
      <ScrollView
        style={!creation && styles.container}
        refreshControl={!creation && <RefreshControl refreshing={loading} onRefresh={refreshAuction} />}
      >
        <AuctionHeader {...auction} />
        {auction.status === AUCTION_STATUS.ACTIVE && (
          <Card style={styles.bidsButton}>
            {bids.length ? (
              <CustomButton
                primaryBtn
                title="Ver ofertas"
                textStyle={styles.white}
                onPress={this.navigateToBids}
              />
            ) : (
              <View style={styles.noOffers}>
                <CustomText>No tenes ninguna oferta</CustomText>
              </View>
            )}
          </Card>
        )}
        <PaymentMethods methods={auction.paymentOptions} />
        <AuctionProducts products={auction.products} />
      </ScrollView>
    );
  }
}

AuctionDetail.propTypes = {
  auction: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({})),
    paymentOptions: PropTypes.arrayOf(PropTypes.shape({})),
    status: PropTypes.string,
    bids: PropTypes.arrayOf(PropTypes.shape({})),
    id: PropTypes.number.isRequired
  }).isRequired,
  creation: PropTypes.bool,
  navigation: PropTypes.shape(navigationModel).isRequired,
  bids: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  refreshAuction: PropTypes.func
};

const enhancer = compose(
  withNavigation,
  Loadable(props => props.loading && !props.refreshing),
  withProps(props => {
    return { bids: props.auction.bids?.filter(b => b.status === BID_STATUS.ACTIVE) };
  })
);

export default enhancer(AuctionDetail);

import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Loadable from '@components/Loadable';

import styles from './styles';
import AuctionHeader from './components/AuctionHeader';
import AuctionProducts from './components/AuctionProducts';

function AuctionDetail({ auction, creation }) {
  return (
    <ScrollView style={!creation && styles.container}>
      <AuctionHeader {...auction} />
      <AuctionProducts products={auction.products} />
    </ScrollView>
  );
}

AuctionDetail.propTypes = {
  auction: PropTypes.shape({
    products: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  creation: PropTypes.bool
};

export default Loadable(props => props.loading)(AuctionDetail);

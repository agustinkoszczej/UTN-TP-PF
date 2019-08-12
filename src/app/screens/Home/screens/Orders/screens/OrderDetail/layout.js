import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Loadable from '@components/Loadable';

import styles from './styles';
import OrderHeader from './components/OrderHeader';

function OrderDetail({ order }) {
  return (
    <ScrollView style={styles.container}>
      <OrderHeader {...order} />
    </ScrollView>
  );
}

OrderDetail.propTypes = {
  order: PropTypes.shape({
    supplier: PropTypes.shape({
      picture: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired
    }).isRequired,
    deliveryDate: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
};

export default Loadable(props => props.loading)(OrderDetail);

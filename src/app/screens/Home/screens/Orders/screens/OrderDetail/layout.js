import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Loadable from '@components/Loadable';

import styles from './styles';
import OrderHeader from './components/OrderHeader';
import OrderProducts from './components/OrderProducts';

function OrderDetail({ order, creation }) {
  const { products } = order;
  return (
    <ScrollView style={!creation && styles.container}>
      <OrderHeader {...order} />
      <OrderProducts products={products} />
    </ScrollView>
  );
}

OrderDetail.propTypes = {
  order: PropTypes.shape({
    supplier: PropTypes.shape({
      picture: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired
    }),
    deliveryDate: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    status: PropTypes.string,
    comment: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  creation: PropTypes.bool
};

export default Loadable(props => props.loading)(OrderDetail);

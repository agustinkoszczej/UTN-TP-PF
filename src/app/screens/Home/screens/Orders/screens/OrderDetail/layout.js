import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Loadable from '@components/Loadable';

import styles from './styles';
import OrderHeader from './components/OrderHeader';
import OrderProducts from './components/OrderProducts';
import PaymentMethod from './components/PaymentMethods';

function OrderDetail({ order, creation, showRateModal }) {
  const { products } = order;
  return (
    <ScrollView style={!creation && styles.container}>
      <OrderHeader {...order} showRateModal={showRateModal} />
      <PaymentMethod method={order.payment.paymentOption} />
      <OrderProducts products={products} />
    </ScrollView>
  );
}

OrderDetail.propTypes = {
  order: PropTypes.shape({
    supplier: PropTypes.shape({
      picture: PropTypes.string,
      fullName: PropTypes.string
    }),
    deliveryDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    amount: PropTypes.string.isRequired,
    status: PropTypes.string,
    comment: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({})),
    payment: PropTypes.shape({
      paymentOption: PropTypes.shape({})
    })
  }).isRequired,
  creation: PropTypes.bool,
  showRateModal: PropTypes.func.isRequired
};

export default Loadable(props => props.loading)(OrderDetail);

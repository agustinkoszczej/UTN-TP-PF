import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Loadable from '@components/Loadable';
import { PAYMENT_METHODS } from '@constants/paymentMethods';

import styles from './styles';
import OrderHeader from './components/OrderHeader';
import OrderProducts from './components/OrderProducts';
import PaymentMethod from './components/PaymentMethod';

function OrderDetail({ order, creation, showRateModal }) {
  const { products } = order;
  return (
    <ScrollView style={!creation && styles.container}>
      <OrderHeader {...order} creation={creation} showRateModal={showRateModal} />
      <PaymentMethod
        method={
          order.payment?.paymentOption || {
            id: order.paymentOptionId,
            description: PAYMENT_METHODS[order.paymentOptionId - 1].text
          }
        }
      />
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
    paymentOptionId: PropTypes.number,
    comment: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({})),
    payment: PropTypes.shape({
      paymentOption: PropTypes.shape({})
    })
  }).isRequired,
  creation: PropTypes.bool,
  showRateModal: PropTypes.func
};

export default Loadable(props => props.loading)(OrderDetail);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import OrderDetail from './layout';

class OrderDetailContainer extends Component {
  render() {
    const { order, loading } = this.props;
    return <OrderDetail order={order} loading={loading} />;
  }
}

OrderDetailContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    supplier: PropTypes.shape({
      fullName: PropTypes.string
    }),
    deliveryDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    amount: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        quantity: PropTypes.string.isRequired,
        product: PropTypes.shape({
          id: PropTypes.number.isRequired,
          description: PropTypes.string.isRequired,
          imageUrl: PropTypes.string.isRequired
        })
      })
    ).isRequired
  })
};

const mapStateToProps = state => ({
  order: state.orders.currentOrder,
  loading: state.orders.currentOrderLoading
});

const enhance = compose(connect(mapStateToProps));

export default enhance(OrderDetailContainer);

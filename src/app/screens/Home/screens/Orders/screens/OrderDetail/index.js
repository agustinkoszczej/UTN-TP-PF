import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import DialogActions from '@redux/dialog/actions';
import { getHomeDialog, homeDialogNames } from '@screens/Home/dialogs';

import OrderDetail from './layout';

function OrderDetailContainer({ order, loading, showRateModal }) {
  return <OrderDetail order={order} loading={loading} showRateModal={showRateModal} />;
}

OrderDetailContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  showRateModal: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => ({
  showRateModal: () => dispatch(DialogActions.showDialog(getHomeDialog(homeDialogNames.RATE_ORDER_MODAL)()))
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(OrderDetailContainer);

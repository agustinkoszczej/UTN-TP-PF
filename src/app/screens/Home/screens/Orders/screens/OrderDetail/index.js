import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import DialogActions from '@redux/dialog/actions';
import { getHomeDialog, homeDialogNames } from '@screens/Home/dialogs';
import OrdersActions from '@redux/orders/actions';

import OrderDetail from './layout';

class OrderDetailContainer extends Component {
  state = { refreshing: false };

  componentDidUpdate({ loading: prevLoading }) {
    const { loading } = this.props;
    const { refreshing } = this.state;
    if (prevLoading !== loading && !refreshing) this.handleRefresh();
  }

  handleRefresh = () => this.setState({ refreshing: true });

  refreshOrder = () => {
    const {
      order: { id },
      getOrderById
    } = this.props;
    getOrderById(id);
  };

  render() {
    const { refreshing } = this.state;
    const { order, loading, showRateModal } = this.props;
    return (
      <OrderDetail
        order={order}
        loading={loading}
        showRateModal={showRateModal}
        refreshOrder={this.refreshOrder}
        refreshing={refreshing}
      />
    );
  }
}

OrderDetailContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  showRateModal: PropTypes.func.isRequired,
  getOrderById: PropTypes.func.isRequired,
  order: PropTypes.shape({
    supplier: PropTypes.shape({
      fullName: PropTypes.string
    }),
    deliveryDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    amount: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
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
  showRateModal: () => dispatch(DialogActions.showDialog(getHomeDialog(homeDialogNames.RATE_ORDER)())),
  getOrderById: id => dispatch(OrdersActions.getOrderById(id))
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(OrderDetailContainer);

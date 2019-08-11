import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import OrdersActions from '@redux/orders/actions';
import { navigationModel } from '@propTypes/navigationModel';

class OrderDetail extends Component {
  componentDidMount() {
    const {
      getOrderById,
      navigation: {
        state: {
          params: { id }
        }
      }
    } = this.props;
    getOrderById(id);
  }

  render() {
    return <Text>Hola</Text>;
  }
}

OrderDetail.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  getOrderById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentOrder: state.orders.currentOrder,
  loading: state.orders.currentOrderLoading
});

const mapDispatchToProps = dispatch => ({
  getOrderById: id => dispatch(OrdersActions.getOrderById(id))
});

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(OrderDetail);

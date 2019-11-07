import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object, string, array } from 'yup';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { PAYMENT_METHODS } from '@constants/paymentMethods';

import CreateOrder from './layout';
import { CREATE_ORDER_FIELDS } from './constants';

class CreateOrderContainer extends Component {
  state = { currentStep: 0 };

  initialValues = {
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS[0].id,
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: new Date(),
    [CREATE_ORDER_FIELDS.MERCHANT_ID]: this.props.currentUserId,
    [CREATE_ORDER_FIELDS.PRODUCTS]: [],
    [CREATE_ORDER_FIELDS.COMMENT]: '',
    [CREATE_ORDER_FIELDS.AMOUNT]: 0
  };

  formValidationSchema = {
    0: object().shape({
      [CREATE_ORDER_FIELDS.SUPPLIER_ID]: string().required('Campo requerido')
    }),
    1: object().shape({
      [CREATE_ORDER_FIELDS.SUPPLIER_ID]: string().required('Campo requerido')
    }),
    2: object().shape({
      [CREATE_ORDER_FIELDS.PRODUCTS]: array().required('Campo requerido')
    }),
    3: object().shape({
      [CREATE_ORDER_FIELDS.SUPPLIER_ID]: string().required('Campo requerido')
    })
  };

  handleNext = () => this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));

  handleBack = () => this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));

  handleCreateOrder = values => {
    const { createOrder } = this.props;
    createOrder(values);
  };

  render() {
    const { currentStep } = this.state;
    const { loading } = this.props;
    return (
      <CreateOrder
        currentStep={currentStep}
        onCreateOrder={this.handleCreateOrder}
        validationSchema={this.formValidationSchema}
        onNext={this.handleNext}
        initialValues={this.initialValues}
        onBack={this.handleBack}
        loading={loading}
      />
    );
  }
}

CreateOrderContainer.propTypes = {
  createOrder: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  currentUserId: state.auth.currentUser.id,
  loading: state.orders.createOrderLoading
});

const mapDispatchToProps = dispatch => ({
  createOrder: values => dispatch(OrdersActions.createOrder(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateOrderContainer);

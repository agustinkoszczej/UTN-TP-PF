import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { connect } from 'react-redux';
import OrdersActions from '@redux/orders/actions';
import { PAYMENT_METHODS } from '@constants/paymentMethods';

import CreateOrder from './layout';
import { CREATE_ORDER_FIELDS } from './constants';

class CreateOrderContainer extends Component {
  state = { currentStep: 0 };

  initialValues = {
    [CREATE_ORDER_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS[0].text,
    [CREATE_ORDER_FIELDS.COMMENT]: '',
    [CREATE_ORDER_FIELDS.AMOUNT]: '',
    [CREATE_ORDER_FIELDS.DELIVERY_DATE]: new Date(),
    [CREATE_ORDER_FIELDS.MERCHANT_ID]: this.props.currentUserId
  };

  formValidationSchema = {
    0: object().shape({
      [CREATE_ORDER_FIELDS.SUPPLIER_ID]: string().required('Campo requerido')
    }),
    1: object().shape({
      [CREATE_ORDER_FIELDS.COMMENT]: string().required('Campo requerido'),
      [CREATE_ORDER_FIELDS.AMOUNT]: string().required('Campo requerido')
    }),
    2: object().shape({
      [CREATE_ORDER_FIELDS.SUPPLIER_ID]: string().required('Campo requerido')
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
    return (
      <CreateOrder
        currentStep={currentStep}
        onCreateOrder={this.handleCreateOrder}
        validationSchema={this.formValidationSchema}
        onNext={this.handleNext}
        initialValues={this.initialValues}
        onBack={this.handleBack}
      />
    );
  }
}

CreateOrderContainer.propTypes = {
  createOrder: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentUserId: state.auth.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  createOrder: values => dispatch(OrdersActions.createOrder(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateOrderContainer);

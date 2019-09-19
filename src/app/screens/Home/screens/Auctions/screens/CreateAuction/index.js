import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { object, array } from 'yup';
import { connect } from 'react-redux';
import AuctionsActions from '@redux/auctions/actions';

import CreateAuction from './layout';
import { CREATE_AUCTIONS_FIELDS } from './constants';

class CreateAuctionContainer extends Component {
  state = { currentStep: 0 };

  initialValues = {
    [CREATE_AUCTIONS_FIELDS.PAYMENT_METHODS]: [],
    [CREATE_AUCTIONS_FIELDS.DELIVERY_DATE]: new Date(),
    [CREATE_AUCTIONS_FIELDS.PRODUCTS]: [],
    [CREATE_AUCTIONS_FIELDS.SHARED]: false,
    [CREATE_AUCTIONS_FIELDS.MERCHANT]: { fullName: this.props.user.fullName },
    [CREATE_AUCTIONS_FIELDS.EXPIRATION_DATE]: new Date(new Date().getTime() + 2 * 7 * 24 * 60 * 60 * 1000)
  };

  formValidationSchema = {
    0: object().shape({
      [CREATE_AUCTIONS_FIELDS.PAYMENT_METHODS]: array().required()
    }),
    1: object().shape({
      [CREATE_AUCTIONS_FIELDS.PRODUCTS]: array().required()
    }),
    2: object().shape({})
  };

  handleNext = () => this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));

  handleBack = () => this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));

  handleCreateAuction = values => {
    const { createAuction } = this.props;
    createAuction(values);
  };

  render() {
    const { currentStep } = this.state;
    const { loading } = this.props;
    return (
      <CreateAuction
        currentStep={currentStep}
        onCreateAuction={this.handleCreateAuction}
        validationSchema={this.formValidationSchema}
        onNext={this.handleNext}
        initialValues={this.initialValues}
        onBack={this.handleBack}
        loading={loading}
      />
    );
  }
}

CreateAuctionContainer.propTypes = {
  createAuction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    fullName: PropTypes.string
  })
};

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  loading: state.auctions.createAuctionLoading
});

const mapDispatchToProps = dispatch => ({
  createAuction: values => dispatch(AuctionsActions.createAuction(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAuctionContainer);

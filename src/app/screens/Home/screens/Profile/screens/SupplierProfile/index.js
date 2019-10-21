import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { userModel } from '@propTypes/userModel';
import Loadable from '@components/Loadable';

import Profile from '../..';

class SupplierProfile extends Component {
  render() {
    const { supplier } = this.props;
    return <Profile supplier={supplier} />;
  }
}

SupplierProfile.propTypes = {
  supplier: PropTypes.shape(userModel)
};

const mapStateToProps = state => ({
  ownRequest: state.auth.agenda.ownRequests,
  loading: state.auth.currentSupplierLoading
});

const enhancer = compose(
  connect(mapStateToProps),
  withProps(ownProps => {
    const id = ownProps.navigation.getParam('id');
    return { id };
  }),
  Loadable(props => props.loading)
);

export default enhancer(SupplierProfile);

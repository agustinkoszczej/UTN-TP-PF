import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import Loadable from '@components/Loadable';

import Profile from '../..';

class SupplierProfile extends Component {
  render() {
    return <Profile supplier />;
  }
}

const mapStateToProps = state => ({
  loading: state.auth.currentSupplierLoading || state.auth.agendaLoading
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

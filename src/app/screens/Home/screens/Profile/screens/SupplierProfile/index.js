import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import Loadable from '@components/Loadable';
import AuthActions from '@redux/auth/actions';

import Profile from '../..';

class SupplierProfile extends Component {
  componentDidUpdate(prevProps) {
    const { routes, cleanSupplier } = this.props;
    if (prevProps.routes > routes) setTimeout(cleanSupplier, 1000);
  }

  render() {
    return <Profile supplier />;
  }
}

SupplierProfile.propTypes = {
  routes: PropTypes.number.isRequired,
  cleanSupplier: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: (state.auth.currentSupplierLoading || state.auth.agendaLoading) && !state.auth.currentSupplier,
  routes: state.nav.routes.length
});

const mapDispatchToProps = dispatch => ({
  cleanSupplier: () => dispatch(AuthActions.cleanSupplier())
});

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(ownProps => {
    const id = ownProps.navigation.getParam('id');
    return { id };
  }),
  Loadable(props => props.loading)
);

export default enhancer(SupplierProfile);

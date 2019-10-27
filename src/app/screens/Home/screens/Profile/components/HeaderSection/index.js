import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions, StackActions, withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import AuthActions from '@redux/auth/actions';
import Routes from '@constants/routes';
import { navigationModel } from '@propTypes/navigationModel';
import { userModel } from '@propTypes/userModel';

import HeaderSection from './layout';

class HeaderSectionContainer extends Component {
  navigateToConfiguration = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate(Routes.ChooseConfiguration);
  };

  handleLogOut = () => {
    const { logOut, redictToLogin } = this.props;
    redictToLogin();
    logOut();
  };

  navigateToChat = () => {
    const {
      navigation: { navigate },
      currentUser: { room }
    } = this.props;
    navigate(Routes.SupplierChat, room);
  };

  handleAccept = () => {
    const {
      acceptRequest,
      currentUser: { id }
    } = this.props;
    acceptRequest(id);
  };

  handleDelete = () => {
    const {
      deleteContact,
      currentUser: { id }
    } = this.props;
    deleteContact(id);
  };

  handleAdd = () => {
    const {
      addContact,
      currentUser: { id }
    } = this.props;
    addContact(id);
  };

  render() {
    const { currentUser } = this.props;
    return (
      <HeaderSection
        {...currentUser}
        {...this.props}
        navigateToConfiguration={this.navigateToConfiguration}
        navigateToChat={this.navigateToChat}
        handleLogOut={this.handleLogOut}
        handleDecline={this.handleDecline}
        handleAccept={this.handleAccept}
        handleAdd={this.handleAdd}
        handleDelete={this.handleDelete}
      />
    );
  }
}

HeaderSectionContainer.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  logOut: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(userModel).isRequired,
  redictToLogin: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.supplier ? state.auth.currentSupplier : state.auth.currentUser,
  acceptLoading: state.auth.acceptContactLoading,
  declineLoading: state.auth.deleteContactLoading,
  contactLoading: state.auth.deleteContactLoading || state.auth.contactLoading
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AuthActions.logOut()),
  redictToLogin: () =>
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: Routes.Login })]
      })
    ),
  acceptRequest: id => dispatch(AuthActions.acceptRequest(id, true)),
  deleteContact: id => dispatch(AuthActions.deleteContact(id)),
  addContact: id => dispatch(AuthActions.addContact(id))
});

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HeaderSectionContainer);

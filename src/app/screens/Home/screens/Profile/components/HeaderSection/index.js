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
    const {
      currentUser: { fullName, email, picture, rating, requestSend, inAgenda, isSupplier, isRequesting }
    } = this.props;
    return (
      <HeaderSection
        fullName={fullName}
        {...this.props}
        email={email}
        navigateToConfiguration={this.navigateToConfiguration}
        navigateToChat={this.navigateToChat}
        handleLogOut={this.handleLogOut}
        picture={picture}
        rating={rating}
        inAgenda={inAgenda}
        isSupplier={isSupplier}
        requestSend={requestSend}
        handleDecline={this.handleDecline}
        handleAccept={this.handleAccept}
        handleAdd={this.handleAdd}
        handleDelete={this.handleDelete}
        isRequesting={isRequesting}
      />
    );
  }
}

HeaderSectionContainer.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  logOut: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(userModel).isRequired,
  loading: PropTypes.bool.isRequired,
  redictToLogin: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentSupplier || state.auth.currentUser,
  loading: state.auth.currentUserLoading,
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

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

  render() {
    const {
      currentUser: { fullName, email, picture, rating },
      loading
    } = this.props;
    return (
      <HeaderSection
        fullName={fullName}
        loading={loading}
        email={email}
        navigateToConfiguration={this.navigateToConfiguration}
        handleLogOut={this.handleLogOut}
        picture={picture}
        rating={rating}
      />
    );
  }
}

HeaderSectionContainer.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  logOut: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape(userModel).isRequired,
  redictToLogin: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps?.supplier || state.auth.currentUser,
  loading: state.auth.currentUserLoading
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AuthActions.logOut()),
  redictToLogin: () =>
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: Routes.Login })]
      })
    )
});

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HeaderSectionContainer);

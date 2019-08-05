import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
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
    const { logOut } = this.props;
    logOut();
  };

  render() {
    const {
      currentUser: { fullName, email, picture },
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
      />
    );
  }
}

HeaderSectionContainer.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired,
  logOut: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape(userModel).isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.currentUserLoading
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(AuthActions.logOut())
});

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HeaderSectionContainer);

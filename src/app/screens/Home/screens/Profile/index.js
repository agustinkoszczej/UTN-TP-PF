import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthActions from '@redux/auth/actions';

import styles from './styles';
import HeaderSection from './components/HeaderSection';
import InfoSection from './components/InfoSection';

function Profile({ loading, getUserInfo, supplier }) {
  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={getUserInfo} />}
    >
      <HeaderSection supplier={supplier} />
      <InfoSection supplier={supplier} />
    </ScrollView>
  );
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  supplier: PropTypes.bool,
  getUserInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.currentUserLoading
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(AuthActions.getUserInfo())
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Profile);

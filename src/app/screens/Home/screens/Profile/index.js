import React, { Component } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthActions from '@redux/auth/actions';

import styles from './styles';
import HeaderSection from './components/HeaderSection';
import InfoSection from './components/InfoSection';

class Profile extends Component {
  handleRefresh = () => {
    const { getUserInfo, id, supplier } = this.props;
    getUserInfo(id, supplier);
  };

  render() {
    const { loading, supplier } = this.props;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={this.handleRefresh} />}
      >
        <HeaderSection supplier={supplier} />
        <InfoSection supplier={supplier} />
      </ScrollView>
    );
  }
}

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  supplier: PropTypes.bool,
  getUserInfo: PropTypes.func.isRequired,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.auth.currentSupplierLoading || state.auth.currentUserLoading,
  id: state.auth.currentSupplier?.id // eslint-disable-line
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (id, supplier) =>
    supplier ? dispatch(AuthActions.getSupplierById(id)) : dispatch(AuthActions.getUserInfo(false))
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Profile);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchHeader from './layout';

class SearchHeaderContainer extends Component {
  handleSearch = search => {};

  render() {
    return <SearchHeader />;
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.updateUserLoading
});

const mapDispatchToProps = dispatch => ({
  updateUser: values => dispatch(AuthActions.updateUser(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeaderContainer);

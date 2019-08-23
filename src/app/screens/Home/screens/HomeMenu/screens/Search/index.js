import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductActions from '@redux/product/actions';
import AuthActions from '@redux/auth/actions';

import Search from './layout';
import { STATES_SELECTED } from './constants';

class SearchContainer extends Component {
  state = { selected: STATES_SELECTED.SUPPLIER };

  componentWillUnmount() {
    const { clearCatalog } = this.props;
    clearCatalog();
  }

  handleSearch = ({ search }) => {
    const { getProducts, getUsers } = this.props;
    const { selected } = this.state;
    if (search) {
      if (selected === STATES_SELECTED.PRODUCT) getProducts(search);
      else getUsers(search);
    }
  };

  handleTypeChange = selected => () => {
    const { selected: actualSelected } = this.state;
    if (selected !== actualSelected) {
      this.setState({ selected });
    }
  };

  render() {
    const { selected } = this.state;
    return (
      <Search handleSearch={this.handleSearch} selected={selected} handleTypeChange={this.handleTypeChange} />
    );
  }
}

SearchContainer.propTypes = {
  getProducts: PropTypes.func.isRequired,
  clearCatalog: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.updateUserLoading
});

const mapDispatchToProps = dispatch => ({
  getProducts: search => dispatch(ProductActions.getProducts(search)),
  getUsers: search => dispatch(AuthActions.getAgenda(search)),
  clearCatalog: () => dispatch(ProductActions.clearCatalog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

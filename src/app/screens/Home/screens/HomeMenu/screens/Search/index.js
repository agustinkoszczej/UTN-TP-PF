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
    const { getProducts, getSuppliers } = this.props;
    const { selected } = this.state;
    if (search) {
      if (selected === STATES_SELECTED.PRODUCT) getProducts(search);
      else getSuppliers(search);
    }
  };

  handleTypeChange = selected => () => {
    const { clearCatalog, clearSuppliers } = this.props;
    const { selected: actualSelected } = this.state;
    if (selected !== actualSelected) {
      this.setState({ selected });
      if (selected === STATES_SELECTED.PRODUCT) clearCatalog();
      else clearSuppliers();
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
  getSuppliers: PropTypes.func.isRequired,
  clearSuppliers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.updateUserLoading
});

const mapDispatchToProps = dispatch => ({
  getProducts: search => dispatch(ProductActions.getProducts(search)),
  getSuppliers: search => dispatch(AuthActions.getSuppliers(search)),
  clearSuppliers: () => dispatch(AuthActions.clearSuppliers()),
  clearCatalog: () => dispatch(ProductActions.clearCatalog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

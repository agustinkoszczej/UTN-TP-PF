import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductActions from '@redux/product/actions';

import Search from './layout';
import { STATES_SELECTED } from './constants';

class SearchContainer extends Component {
  state = { selected: STATES_SELECTED.SUPPLIER };

  componentWillUnmount() {
    const { clearCatalog } = this.props;
    clearCatalog();
  }

  handleSearch = ({ search }) => {
    const { getProducts } = this.props;
    if (search) getProducts(search);
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
  clearCatalog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.updateUserLoading
});

const mapDispatchToProps = dispatch => ({
  getProducts: values => dispatch(ProductActions.getProducts(values)),
  clearCatalog: () => dispatch(ProductActions.clearCatalog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductActions from '@redux/product/actions';

import SearchHeader from './layout';

class SearchHeaderContainer extends Component {
  handleSearch = ({ search }) => {
    const { getProducts } = this.props;
    getProducts(search);
  };

  render() {
    return <SearchHeader handleSearch={this.handleSearch} />;
  }
}

SearchHeaderContainer.propTypes = {
  getProducts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.updateUserLoading
});

const mapDispatchToProps = dispatch => ({
  getProducts: values => dispatch(ProductActions.getProducts(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchHeaderContainer);

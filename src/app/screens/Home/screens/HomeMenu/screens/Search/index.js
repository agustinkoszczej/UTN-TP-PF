import React, { Component } from 'react';

import SearchHeader from './components/SearchHeader';
import SearchResults from './components/SearchResults';

class SearchContainer extends Component {
  render() {
    return (
      <>
        <SearchHeader />
        <SearchResults />
      </>
    );
  }
}

export default SearchContainer;

import React, { Component } from 'react';
import Loading from '@components/Loading';

const LoadableWrapper = shouldLoad => WrappedComponent => {
  class Loadable extends Component {
    state = {
      initialLoading: true
    };

    static getDerivedStateFromProps(props, state) {
      return state.initialLoading && !shouldLoad(props) ? { initialLoading: false } : null;
    }

    render() {
      const { initialLoading } = this.state;
      return shouldLoad(this.props) || initialLoading ? <Loading /> : <WrappedComponent {...this.props} />;
    }
  }

  return Loadable;
};

export default LoadableWrapper;

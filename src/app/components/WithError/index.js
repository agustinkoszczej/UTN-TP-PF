import React from 'react';

import Error from './components/Error';

const WithError = (showError, values) => WrappedComponent => {
  const error = props => (showError(props) ? <Error {...values(props)} /> : <WrappedComponent {...props} />);
  return error;
};

export default WithError;

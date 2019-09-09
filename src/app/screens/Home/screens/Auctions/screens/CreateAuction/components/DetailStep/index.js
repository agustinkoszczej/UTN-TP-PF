import React from 'react';
import PropTypes from 'prop-types';

import AuctionDetail from '../../../AuctionDetail/layout';

function DetailStep({ values }) {
  return <AuctionDetail auction={values} creation />;
}

DetailStep.propTypes = {
  values: PropTypes.shape({}).isRequired
};

export default DetailStep;

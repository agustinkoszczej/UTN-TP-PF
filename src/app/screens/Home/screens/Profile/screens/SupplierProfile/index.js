import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { userModel } from '@propTypes/userModel';

import Profile from '../..';

function SupplierProfile({ supplier }) {
  return <Profile supplier={supplier} />;
}

SupplierProfile.propTypes = {
  supplier: PropTypes.shape(userModel)
};

const enhancer = compose(
  withProps(ownProps => {
    const {
      email,
      companyName,
      contactNumber,
      streetAddress,
      qrUrl,
      fullName,
      user_id: id,
      picture,
      cuit,
      location,
      rating: { score }
    } = ownProps.navigation.getParam('supplier');
    const locations = location.split(',');
    return {
      supplier: {
        email,
        companyName,
        fullName,
        contactNumber,
        streetAddress,
        qrUrl,
        id,
        cuit,
        picture,
        latitude: locations[0],
        longitude: locations[1],
        rating: score
      }
    };
  })
);

export default enhancer(SupplierProfile);

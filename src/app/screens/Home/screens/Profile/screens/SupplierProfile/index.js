import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { userModel } from '@propTypes/userModel';

import Profile from '../..';

function SupplierProfile({ supplier }) {
  return <Profile supplier={supplier} />;
}

SupplierProfile.propTypes = {
  supplier: PropTypes.shape(userModel)
};

const mapStateToProps = state => ({
  ownRequest: state.auth.agenda.ownRequests
});

const enhancer = compose(
  connect(mapStateToProps),
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
      rating,
      inAgenda
    } = ownProps.navigation.getParam('supplier');
    const requestSend = ownProps.ownRequest.some(supplier => supplier.user_id === id);
    const locations = location.split(',');
    const score = rating?.score || 0;
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
        rating: score,
        inAgenda,
        requestSend
      }
    };
  })
);

export default enhancer(SupplierProfile);

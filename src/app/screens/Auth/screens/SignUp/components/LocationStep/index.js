import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatLocation } from '@constants/geolocation';

import { SIGN_UP_FIELDS, LOCATION_FIELDS } from '../../constants';

import LocationStep from './layout';

class LocationStepContainer extends Component {
  state = { displayList: false, region: null, coordinate: null };

  handleAddressChange = values => {
    const { setFieldValue } = this.props;
    setFieldValue(SIGN_UP_FIELDS.LOCATION, {
      [LOCATION_FIELDS.ADDRESS]: values.address,
      [LOCATION_FIELDS.STREET_NUMBER]: values.streetNumber,
      [LOCATION_FIELDS.LATITUDE]: values.latitude,
      [LOCATION_FIELDS.LONGITUDE]: values.longitude
    });
    this.setState({
      ...formatLocation(values),
      address: values.address,
      displayList: false
    });
  };

  handleRegionChange = region => {
    this.setState({ region });
  };

  handleShowList = () => this.setState({ displayList: true });

  handleHideList = () => this.setState({ displayList: false });

  render() {
    const { address, region, coordinate, displayList } = this.state;
    return (
      <LocationStep
        {...this.props}
        displayList={displayList}
        onShowList={this.handleShowList}
        onHideList={this.handleHideList}
        region={region}
        onRegionChange={this.handleRegionChange}
        onAddressChange={this.handleAddressChange}
        coordinate={coordinate}
        currentAddress={address}
      />
    );
  }
}

LocationStepContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),
  setFieldValue: PropTypes.func.isRequired
};

export default LocationStepContainer;

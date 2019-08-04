import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatLocation } from '@constants/geolocation';

import { SIGN_UP_FIELDS } from '../../constants';

import LocationStep from './layout';

class LocationStepContainer extends Component {
  state = { displayList: false, region: null, coordinate: null, clicked: false };

  handleAddressChange = values => {
    const { setFieldValue } = this.props;
    setFieldValue(SIGN_UP_FIELDS.ADDRESS, values.address);
    setFieldValue(SIGN_UP_FIELDS.LOCATION, `${values.latitude}, ${values.longitude}`);
    setFieldValue(SIGN_UP_FIELDS.STREET_NUMBER, values.streetNumber);
    this.setState({
      ...formatLocation(values),
      address: values.address,
      displayList: false,
      clicked: !!values.address
    });
  };

  handleRegionChange = region => {
    this.setState({ region });
  };

  handleShowList = () => this.setState({ displayList: true });

  handleHideList = () => this.setState({ displayList: false });

  render() {
    const { address, region, coordinate, displayList, clicked } = this.state;
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
        clicked={clicked}
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

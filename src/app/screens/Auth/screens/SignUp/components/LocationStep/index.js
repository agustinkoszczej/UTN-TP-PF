import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatLocation } from '@constants/geolocation';

import LocationStep from './layout';

class LocationStepContainer extends Component {
  state = { displayList: false, region: null, coordinate: null };

  handleAddressChange = values => {
    this.setState({
      ...formatLocation(values),
      address: values.address,
      streetNumber: values.streetNumber,
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
  })
};

export default LocationStepContainer;

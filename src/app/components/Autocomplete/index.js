import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from './layout';

class AutocompleteContainer extends Component {
  getDefaultValue = () => {
    const { defaultValue = '' } = this.props;
    return defaultValue;
  };

  handlePress = (data, details = null) => {
    const { onPress } = this.props;
    const latitude = details?.geometry?.location?.lat;
    const longitude = details?.geometry?.location?.lng;
    const address = data?.description;
    // eslint-disable-next-line camelcase
    const streetNumber = details?.address_components?.find(item => item.types.includes('street_number'))
      ?.long_name; // eslint-disable-line camelcase
    if (onPress) onPress({ address, latitude, longitude, streetNumber });
  };

  render() {
    return <Autocomplete {...this.props} onPress={this.handlePress} defaultValue={this.getDefaultValue} />;
  }
}

AutocompleteContainer.propTypes = {
  onPress: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
};

export default AutocompleteContainer;

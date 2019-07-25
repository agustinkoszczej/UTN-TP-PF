import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Routes from '@constants/routes';
import { formatLocation } from '@constants/geolocation';

import FixLocation from './layout';

class FixLocationContainer extends Component {
  state = { displayList: false, region: null, coordinate: null };

  static getDerivedStateFromProps(props, state) {
    if (!state.region) {
      const latitude = props.navigation.getParam('latitude');
      const longitude = props.navigation.getParam('longitude');
      const address = props.navigation.getParam('address');
      const streetNumber = props.navigation.getParam('streetNumber');
      return { ...formatLocation({ latitude, longitude }), address, streetNumber };
    }
    return {};
  }

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

  handleContinue = () => {
    const { navigation } = this.props;
    const { address, coordinate, streetNumber } = this.state;
    navigation.navigate(Routes.PickUpOrDelivery, {
      streetNumber,
      address,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    });
  };

  handleShowList = () => this.setState({ displayList: true });

  handleHideList = () => this.setState({ displayList: false });

  render() {
    const { address, region, coordinate, displayList } = this.state;
    return (
      <FixLocation
        {...this.props}
        displayList={displayList}
        onShowList={this.handleShowList}
        onHideList={this.handleHideList}
        region={region}
        onRegionChange={this.handleRegionChange}
        onAddressChange={this.handleAddressChange}
        coordinate={coordinate}
        onContinue={this.handleContinue}
        currentAddress={address}
      />
    );
  }
}

FixLocationContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export default FixLocationContainer;

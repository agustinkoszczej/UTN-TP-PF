import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatLocation } from '@constants/geolocation';
import { userModel } from '@propTypes/userModel';

import { SIGN_UP_FIELDS } from '../../constants';

import LocationStep from './layout';

class LocationStepContainer extends Component {
  state = { displayList: false, region: null, coordinate: null, clicked: false };

  componentDidMount() {
    const { currentUser, values } = this.props;
    const value = currentUser || values;
    if (value.streetAddress) {
      const { streetAddress } = value;
      this.setState({
        ...formatLocation(value),
        address: streetAddress,
        displayList: false,
        clicked: true
      });
    }
  }

  handleAddressChange = values => {
    const { setFieldValue } = this.props;
    setFieldValue(SIGN_UP_FIELDS.ADDRESS, values.address);
    setFieldValue(SIGN_UP_FIELDS.LONGITUDE, values.latitude);
    setFieldValue(SIGN_UP_FIELDS.LATITUDE, values.longitude);
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
    const { currentUser, values } = this.props;
    const defaultValue = currentUser?.streetAddress || values?.streetAddress;
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
        defaultValue={defaultValue}
      />
    );
  }
}

LocationStepContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }),
  setFieldValue: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(userModel),
  values: PropTypes.shape({
    [SIGN_UP_FIELDS.ADDRESS]: PropTypes.string,
    [SIGN_UP_FIELDS.COMPANY_NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.CUIT]: PropTypes.string,
    [SIGN_UP_FIELDS.EMAIL]: PropTypes.string,
    [SIGN_UP_FIELDS.LOCATION]: PropTypes.string,
    [SIGN_UP_FIELDS.NAME]: PropTypes.string,
    [SIGN_UP_FIELDS.PASSWORD]: PropTypes.string,
    [SIGN_UP_FIELDS.PHONE]: PropTypes.string,
    [SIGN_UP_FIELDS.QR_URL]: PropTypes.string,
    [SIGN_UP_FIELDS.STREET_NUMBER]: PropTypes.string
  })
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(LocationStepContainer);

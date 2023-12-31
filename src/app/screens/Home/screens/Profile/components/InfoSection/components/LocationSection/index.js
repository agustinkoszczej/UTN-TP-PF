import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatLocation } from '@constants/geolocation';
import { userModel } from '@propTypes/userModel';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Card from '@components/Card';
import CustomText from '@components/CustomText';

import styles from './styles';

function LocationSection({ currentUser }) {
  const { streetAddress, latitude, longitude } = currentUser;
  const { region, coordinate } = formatLocation({ longitude, latitude });
  const location = streetAddress.split(',')[0];
  return (
    <View style={styles.mapContainer}>
      <Card style={styles.addressCard}>
        <CustomText style={styles.text}>{location}</CustomText>
      </Card>
      <Card styles={styles.mapCard}>
        <MapView style={styles.map} region={region} scrollEnabled={false} pitchEnabled={false}>
          <Marker coordinate={coordinate} />
        </MapView>
      </Card>
    </View>
  );
}

LocationSection.propTypes = {
  region: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired
  }),
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  streetAddress: PropTypes.string.isRequired,
  currentUser: PropTypes.shape(userModel).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.supplier ? state.auth.currentSupplier : state.auth.currentUser
});

export default connect(mapStateToProps)(LocationSection);

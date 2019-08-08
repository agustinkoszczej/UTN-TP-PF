import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import styles from './styles';

function LocationSection({ region, coordinate }) {
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} region={region} scrollEnabled={false} pitchEnabled={false}>
        <Marker coordinate={coordinate} />
      </MapView>
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
  })
};

export default LocationSection;

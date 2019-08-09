import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LottieView from 'lottie-react-native';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import locationMarker from '@lottieAssets/location-marker.json';

import styles from './styles';

function LocationSection({ region, coordinate, streetAddress }) {
  const location = streetAddress.split(',')[0];
  return (
    <View style={styles.mapContainer}>
      <Card style={styles.addressCard}>
        <CustomText style={styles.text}>{location}</CustomText>
        <LottieView autoPlay loop source={locationMarker} style={styles.animation} />
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
  streetAddress: PropTypes.string.isRequired
};

export default LocationSection;

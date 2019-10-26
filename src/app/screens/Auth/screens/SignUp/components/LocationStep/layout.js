import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';
import Autocomplete from '@components/Autocomplete';

import { SIGN_UP_FIELDS } from '../../constants';

import { strings } from './constants';
import styles from './styles';

function LocationStep({
  region,
  coordinate,
  onRegionChange,
  onAddressChange,
  displayList,
  onShowList,
  onHideList,
  defaultValue
}) {
  return (
    <View style={styles.container}>
      <Autocomplete
        defaultValue={defaultValue}
        placeholder={strings.placeholder}
        onPress={onAddressChange}
        displayList={displayList}
        textInputProps={{ onFocus: onShowList, onSubmitEditing: onHideList }}
      >
        <View style={styles.mapContainer}>
          {region && coordinate && (
            <MapView
              style={styles.map}
              region={region}
              provider={PROVIDER_GOOGLE}
              onRegionChange={onRegionChange}
              scrollEnabled={false}
              pitchEnabled={false}
            >
              <Marker coordinate={coordinate} />
            </MapView>
          )}
        </View>
      </Autocomplete>
    </View>
  );
}

LocationStep.propTypes = {
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
  onRegionChange: PropTypes.func.isRequired,
  onAddressChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  displayList: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onShowList: PropTypes.func,
  onHideList: PropTypes.func,
  values: PropTypes.shape({
    [SIGN_UP_FIELDS.ADDRESS]: PropTypes.string,
    [SIGN_UP_FIELDS.STREET_NUMBER]: PropTypes.oneOf(PropTypes.number || PropTypes.string)
  })
};

export default LocationStep;

import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';
import BaseForm from '@components/BaseForm';
import CustomText from '@components/CustomText';
import Autocomplete from '@components/Autocomplete';

import { strings } from './constants';
import styles from './styles';

function FixLocation({
  region,
  coordinate,
  currentAddress,
  onContinue,
  onRegionChange,
  onAddressChange,
  displayList,
  onShowList,
  onHideList
}) {
  return (
    <BaseForm
      showButton
      primaryBtn
      onSubmit={onContinue}
      buttonTitle={strings.useDirection}
      style={styles.container}
      buttonStyle={styles.button}
    >
      <CustomText center style={styles.header}>
        {strings.fixDirection}
      </CustomText>
      <Autocomplete
        defaultValue={currentAddress}
        placeholder={strings.placeholder}
        onPress={onAddressChange}
        displayList={displayList}
        textInputProps={{ onFocus: onShowList, onSubmitEditing: onHideList }}
      >
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            onRegionChange={onRegionChange}
            scrollEnabled={false}
            pitchEnabled={false}
          >
            <Marker coordinate={coordinate} />
          </MapView>
        </View>
      </Autocomplete>
    </BaseForm>
  );
}

FixLocation.propTypes = {
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
  onContinue: PropTypes.func.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onAddressChange: PropTypes.func.isRequired,
  currentAddress: PropTypes.string.isRequired,
  displayList: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onShowList: PropTypes.func,
  onHideList: PropTypes.func
};

export default FixLocation;

import React, { Component } from 'react';
import { View, ViewPropTypes, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import GoogleConfig, { formatAutocompleteRow } from '@constants/geolocation';
import localizationIcon from '@assets/ic_localizacion.png';
import CustomText from '@components/CustomText';

import styles, { autocompleteStyles } from './styles';

class Autocomplete extends Component {
  renderLeftButton = () => <Image style={styles.localizationIcon} source={localizationIcon} />;

  renderRow = rowData => {
    const data = formatAutocompleteRow(rowData);
    return (
      <View style={styles.rowContainer}>
        <Image style={styles.localizationIcon} source={localizationIcon} />
        <View>
          <CustomText primary>{data.mainText}</CustomText>
          <CustomText secondary>{data.secondaryText}</CustomText>
        </View>
      </View>
    );
  };

  render() {
    const {
      placeholder,
      defaultValue,
      customStyles,
      onPress,
      displayList,
      textInputProps,
      containerStyle,
      contentStyle,
      deactivateColor,
      children
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          minLength={1}
          autoFocus={false}
          listViewDisplayed={displayList}
          fetchDetails
          onPress={onPress}
          query={GoogleConfig.query}
          nearbyPlacesAPI={GoogleConfig.nearbyPlacesAPI}
          GooglePlacesSearchQuery={GoogleConfig.placesSearchQuery}
          filterReverseGeocodingByTypes={GoogleConfig.geocodingTypes}
          renderLeftButton={this.renderLeftButton}
          debounce={GoogleConfig.debounce}
          enablePoweredByContainer={false}
          getDefaultValue={defaultValue}
          styles={{ ...autocompleteStyles(displayList, deactivateColor), ...customStyles }}
          textInputProps={textInputProps}
          renderRow={this.renderRow}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, contentStyle]}
          isRowScrollable={false}
        >
          {children}
        </GooglePlacesAutocomplete>
      </View>
    );
  }
}

Autocomplete.defaultProps = {
  defaultValue: () => '',
  placeholder: '',
  customStyles: {},
  displayList: 'auto',
  containerStyle: {}
};

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  defaultValue: PropTypes.func,
  onPress: PropTypes.func.isRequired,
  customStyles: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
  displayList: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  textInputProps: PropTypes.shape({
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  }),
  deactivateColor: PropTypes.bool,
  containerStyle: ViewPropTypes.style
};

export default Autocomplete;

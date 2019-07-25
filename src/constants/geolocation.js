import { isIos } from '@constants/platform';

export const currentPositionConfig = {
  enableHighAccuracy: isIos,
  timeout: 20000
};

export const LATITUDE_DELTA = 0.003;
export const LONGITUDE_DELTA = 0.003;

export const IOS_GOOGLE_SCHEMA = 'comgooglemapsurl:';

const placesAutocompleteCfg = {
  query: {
    key: 'AIzaSyC4ltSC7u0txxUthfzxB4kx7DaVECqyFUs',
    language: 'es',
    components: `country:ar`
  },
  placesSearchQuery: {
    rankby: 'distance'
  },
  geocodingTypes: ['address'],
  returnKeyType: 'done',
  listViewDisplayed: 'auto',
  nearbyPlacesAPI: 'GooglePlacesSearch',
  debounce: 0
};

export const formatLocation = ({ latitude, longitude }) => {
  const region = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };
  const coordinate = {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
  return { region, coordinate };
};

export const buildAppleMapsFromToUrl = (saddr, daddr) =>
  `https://maps.apple.com/?saddr=${saddr.latitude},${saddr.longitude}&daddr=${daddr.latitude},${daddr.longitude}`;

export const buildGoogleMapsFromToUrl = (saddr, daddr) =>
  `https://maps.google.com/maps?saddr=${saddr.latitude},${saddr.longitude}&daddr=${daddr.latitude},${daddr.longitude}`;

export const formatAutocompleteRow = ({
  description,
  structured_formatting: { main_text: mainText, secondary_text: secondaryText }
}) => ({
  description,
  mainText,
  secondaryText
});

export default placesAutocompleteCfg;

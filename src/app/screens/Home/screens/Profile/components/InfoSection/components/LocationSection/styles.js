import { StyleSheet } from 'react-native';
import { alto } from '@constants/colors';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    borderColor: alto,
    borderWidth: 0.5,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
    marginTop: 15,
    marginBottom: 10
  },
  map: {
    width: '100%',
    height: 300
  }
});
export default styles;

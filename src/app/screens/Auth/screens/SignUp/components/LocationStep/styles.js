import { StyleSheet } from 'react-native';
import { white, alto } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: white,
    flex: 1
  },
  header: {
    marginBottom: 15
  },
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
    height: '100%'
  },
  button: {
    zIndex: 3,
    flexShrink: 1
  }
});
export default styles;

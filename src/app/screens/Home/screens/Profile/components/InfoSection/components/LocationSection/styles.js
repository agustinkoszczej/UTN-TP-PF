import { StyleSheet } from 'react-native';
import { alto } from '@constants/colors';

const styles = StyleSheet.create({
  mapContainer: {
    padding: 10
  },
  map: {
    width: '100%',
    height: 300
  },
  addressCard: {
    marginBottom: 20,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapCard: {
    flex: 1,
    borderRadius: 10,
    borderColor: alto,
    borderWidth: 0.5,
    width: '90%',
    overflow: 'hidden',
    zIndex: 1,
    marginTop: 15,
    marginBottom: 10
  },
  animation: {
    position: 'absolute',
    left: 50
  },
  text: {
    position: 'relative'
  }
});
export default styles;

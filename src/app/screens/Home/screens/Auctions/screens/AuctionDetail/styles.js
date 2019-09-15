import { StyleSheet } from 'react-native';
import { alto } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: alto
  },
  bidsButton: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  noOffers: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;

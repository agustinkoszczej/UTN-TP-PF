import { StyleSheet } from 'react-native';
import { black } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    marginVertical: 15
  },
  paymentButton: {
    width: 125,
    marginRight: 15
  },
  selected: {
    borderWidth: 2,
    borderColor: black
  }
});
export default styles;

import { StyleSheet } from 'react-native';
import { transparent } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: transparent
  },
  separator: {
    marginVertical: 7
  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  errorMessage: {
    marginVertical: 5
  }
});

export default styles;

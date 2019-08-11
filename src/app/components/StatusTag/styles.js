import { StyleSheet } from 'react-native';
import { green, red, amber } from '@constants/colors';

const styles = StyleSheet.create({
  redTag: {
    backgroundColor: red
  },
  greenTag: {
    backgroundColor: green
  },
  yellowTag: {
    backgroundColor: amber
  },
  tag: {
    padding: 7.5,
    borderRadius: 10
  }
});
export default styles;

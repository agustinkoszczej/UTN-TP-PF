import { StyleSheet } from 'react-native';
import { black } from '@constants/colors';

const MARGIN_HORIZONTAL_BUTTON = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: MARGIN_HORIZONTAL_BUTTON
  },
  footer: {
    flex: 0.2,
    backgroundColor: black,
    justifyContent: 'center'
  }
});

export default styles;

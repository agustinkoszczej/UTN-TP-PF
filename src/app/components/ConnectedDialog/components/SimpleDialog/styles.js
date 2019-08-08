import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const PADDING = 15;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    margin: 10,
    paddingHorizontal: PADDING
  },
  title: {
    paddingVertical: PADDING
  },
  content: {
    paddingTop: PADDING,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dataContainer: {
    paddingHorizontal: PADDING
  }
});

export default styles;

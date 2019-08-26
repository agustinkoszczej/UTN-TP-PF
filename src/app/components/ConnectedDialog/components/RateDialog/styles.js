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
    paddingVertical: PADDING,
    fontSize: 20
  },
  content: {
    paddingTop: PADDING,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dataContainer: {
    paddingHorizontal: PADDING
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});

export default styles;

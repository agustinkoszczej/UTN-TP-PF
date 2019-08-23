import { StyleSheet } from 'react-native';
import { white, black } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 20
  },
  white: {
    color: white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    width: '70%'
  },
  button: {
    width: '25%'
  },
  buttonsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  typeButton: {
    paddingHorizontal: 10
  },
  iconStyle: {
    height: 25,
    width: 25,
    marginRight: 10
  },
  blackBorder: {
    borderColor: black
  }
});
export default styles;

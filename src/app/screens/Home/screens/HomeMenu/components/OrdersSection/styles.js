import { StyleSheet } from 'react-native';
import { green, red, amber, white } from '@constants/colors';

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  card: {
    width: 100,
    height: 100,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  green: {
    backgroundColor: green
  },
  yellow: {
    backgroundColor: amber
  },
  red: {
    backgroundColor: red
  },
  white: {
    color: white,
    fontSize: 15,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 16
  }
});
export default styles;

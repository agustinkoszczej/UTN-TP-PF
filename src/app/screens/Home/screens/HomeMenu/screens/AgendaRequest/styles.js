import { StyleSheet } from 'react-native';
import { alto, white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: alto,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30
  },
  cardContainer: {
    marginBottom: 50,
    padding: 20
  },
  white: {
    color: white
  },
  row: {
    flexDirection: 'row'
  },
  button: {
    width: 100
  }
});
export default styles;

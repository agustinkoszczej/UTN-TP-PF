import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
export default styles;

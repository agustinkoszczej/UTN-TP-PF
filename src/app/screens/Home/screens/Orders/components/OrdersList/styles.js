import { StyleSheet } from 'react-native';
import { alto, white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: alto
  },
  orderContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 15,
    height: 150
  },
  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  white: {
    color: white
  },
  seeButton: {
    width: 50,
    height: 50
  }
});
export default styles;

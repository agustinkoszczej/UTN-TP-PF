import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  itemContainer: {
    height: 50,
    marginBottom: 20,
    flexDirection: 'row'
  },
  white: {
    color: white
  },
  itemImage: {
    width: 20,
    height: 20
  }
});
export default styles;

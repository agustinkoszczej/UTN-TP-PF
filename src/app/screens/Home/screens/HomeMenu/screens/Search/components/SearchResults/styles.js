import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: '5%'
  },
  white: {
    color: white
  },
  itemImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 20
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    width: 40,
    height: 35
  }
});
export default styles;

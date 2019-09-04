import { StyleSheet } from 'react-native';
import { alto, white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: alto,
    padding: 20
  },
  orderContainer: {
    flex: 1,
    marginVertical: 15,
    padding: 20,
    minHeight: 150
  },
  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  white: {
    color: white
  },
  seeButton: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end'
  },
  orderHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  orderName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomOrder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 65,
    alignItems: 'center',
    height: 60
  },
  name: {
    fontSize: 18
  }
});
export default styles;

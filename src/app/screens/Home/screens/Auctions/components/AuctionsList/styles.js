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
    padding: 25,
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
    marginTop: 10
  },
  orderHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
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
    alignItems: 'center',
    height: 60,
    marginVertical: 5
  },
  name: {
    fontSize: 18
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  }
});
export default styles;

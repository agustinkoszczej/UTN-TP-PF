import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  supplierContainer: {
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginBottom: 20
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 20
  },
  infoSupplier: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    //marginBottom: 20
  },
  white: {
    color: white
  },
  button: {
    width: 50
  }
});
export default styles;

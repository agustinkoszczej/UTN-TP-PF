import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  supplierContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between'
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
    fontSize: 16
  }
});
export default styles;

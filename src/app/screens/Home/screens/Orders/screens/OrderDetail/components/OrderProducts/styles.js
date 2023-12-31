import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 20,
    margin: 20
  },
  productImage: {
    width: 30,
    height: 30,
    marginRight: 20,
    borderRadius: 15
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15
  },
  productInfo: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  separator: {
    fontWeight: 'bold'
  }
});
export default styles;

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  productContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  productImage: {
    width: 30,
    height: 30,
    marginRight: 20,
    borderRadius: 10
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightButton: {
    marginLeft: 15
  },
  buttonFont: {
    fontSize: 20
  }
});

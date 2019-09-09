import { StyleSheet } from 'react-native';
import { transparent, white } from '@constants/colors';
import { verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
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
  },
  container: {
    flex: 1,
    height: '100%',
    marginBottom: 10
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '70%'
  },
  white: {
    color: white
  },
  header: {
    flexDirection: 'row'
  },
  search: {
    width: '25%',
    marginLeft: '5%',
    marginBottom: 15
  }
});

import { StyleSheet } from 'react-native';
import { transparent, black } from '@constants/colors';
import { verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '100%'
  },
  paymentMethod: {
    paddingVertical: 15,
    borderColor: black,
    borderWidth: 0.2,
    marginVertical: 15
  }
});

import { StyleSheet } from 'react-native';
import { transparent } from '@constants/colors';
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
  }
});

import { StyleSheet } from 'react-native';
import { transparent } from '@constants/colors';
import { scale, verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around'
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '100%'
  }
});

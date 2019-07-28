import { StyleSheet } from 'react-native';
import { verticalScale } from '@utils/scalingUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20
  },
  icon: {
    height: verticalScale(75),
    width: verticalScale(75)
  }
});
export default styles;

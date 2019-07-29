import { StyleSheet } from 'react-native';
import { verticalScale, scale } from '@utils/scalingUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    height: verticalScale(75),
    width: verticalScale(75)
  },
  name: {
    fontSize: 20
  },
  button: {
    width: scale(250)
  }
});
export default styles;

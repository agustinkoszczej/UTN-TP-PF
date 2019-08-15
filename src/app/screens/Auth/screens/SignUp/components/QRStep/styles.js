import { StyleSheet } from 'react-native';
import { verticalScale } from '@utils/scalingUtils';

const styles = StyleSheet.create({
  container: {
    marginVertical: 75,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  qr: {
    height: verticalScale(150),
    width: verticalScale(150)
  }
});

export default styles;

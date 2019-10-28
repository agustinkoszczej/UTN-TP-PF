import { StyleSheet } from 'react-native';
import { verticalScale } from '@utils/scalingUtils';
import { white } from '@constants/colors';

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
  },
  qrImage: {
    width: 180,
    height: 200,
  },
  white: {
    color: white
  },
  button: {
    width: 150
  }
});

export default styles;

import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';
import { verticalScale } from '@utils/scalingUtils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: verticalScale(200),
    height: verticalScale(200)
  }
});

export default styles;

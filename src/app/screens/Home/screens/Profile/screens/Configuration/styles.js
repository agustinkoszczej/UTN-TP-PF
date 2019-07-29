import { StyleSheet } from 'react-native';
import { white, black, gray } from '@constants/colors';
import { scale, verticalScale } from '@utils/scalingUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingVertical: 40
  }
});

export default styles;

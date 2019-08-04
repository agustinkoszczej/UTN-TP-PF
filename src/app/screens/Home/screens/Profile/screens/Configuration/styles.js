import { StyleSheet } from 'react-native';
import { scale } from '@utils/scalingUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingVertical: 40
  }
});

export default styles;

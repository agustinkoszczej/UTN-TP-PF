import { StyleSheet } from 'react-native';
import { scale } from '@utils/scalingUtils';
import { white } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingVertical: 40
  },
  white: {
    color: white
  }
});

export default styles;

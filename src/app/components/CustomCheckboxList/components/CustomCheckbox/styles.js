import { StyleSheet } from 'react-native';
import { wildSand } from '@constants/colors';
import { WINDOW_WIDTH } from '@constants/platform';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  tooltip: {
    shadowColor: 'transparent'
  },
  content: {
    backgroundColor: wildSand,
    width: WINDOW_WIDTH - 20,
    marginLeft: 12,
    padding: 0,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  arrowSize: {
    width: 16,
    height: 12
  }
});

export default styles;

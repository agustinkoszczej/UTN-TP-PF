import { StyleSheet } from 'react-native';
import { dustyGray } from '@constants/colors';
import { IS_SMALL_DEVICE } from '@constants/platform';

const ICON_SIZE = 35;
const COMMON_MARGIN = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    borderLeftWidth: 3,
    borderLeftColor: dustyGray,
    height: '100%',
    marginRight: COMMON_MARGIN
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginRight: IS_SMALL_DEVICE ? 5 : 15
  },
  checkbox: {
    marginRight: COMMON_MARGIN
  }
});

export default styles;

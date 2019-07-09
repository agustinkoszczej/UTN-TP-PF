import { StyleSheet } from 'react-native';
import { alto, black, oceanGreen, white } from '@constants/colors';

const ICON_SIZE = 20;
const OPTION_ICON_SIZE = 26;
const DEFAULT_BORDER = 1;
const PADDING = 10;
const COMMON_RADIUS = 2;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    borderColor: alto,
    borderRadius: COMMON_RADIUS,
    borderWidth: DEFAULT_BORDER,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: PADDING,
    shadowColor: black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: COMMON_RADIUS
  },
  selected: {
    borderColor: oceanGreen,
    borderWidth: 2,
    padding: PADDING - DEFAULT_BORDER
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginRight: 8
  },
  optionIcon: {
    position: 'absolute',
    alignSelf: 'flex-start',
    height: OPTION_ICON_SIZE,
    width: OPTION_ICON_SIZE,
    bottom: OPTION_ICON_SIZE
  },
  disabled: {
    backgroundColor: alto
  }
});

export default styles;

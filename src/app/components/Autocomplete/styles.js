import { StyleSheet } from 'react-native';
import { white, alto, doveGray, oceanGreen, transparent, black } from '@constants/colors';
import { isIos } from '@constants/platform';

const BORDER_RADIUS = 10;
const START = 0;
const NONE = 0;
const ICON_WIDTH = 12;
const ICON_HEIGHT = 16;
const SMALL_SPACING = 5;
const MEDIUM_SPACING = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: NONE
  },
  rowContainer: {
    flexDirection: 'row',
    height: '100%',
    width: '100%'
  },
  localizationIcon: {
    width: ICON_WIDTH,
    height: ICON_HEIGHT,
    overflow: 'visible',
    alignSelf: 'center',
    marginRight: 18
  },
  content: {
    // TODO: Unused style. But i'd let here to show that u can use it. This is a hidden style
  }
});

export const autocompleteStyles = (active, deactivateColor) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: transparent,
      overflow: 'hidden',
      paddingBottom: isIos ? NONE : SMALL_SPACING,
      alignItems: 'center'
    },
    description: {
      color: doveGray
    },
    textInput: {
      backgroundColor: white,
      paddingLeft: NONE,
      paddingRight: NONE,
      marginLeft: NONE,
      marginRight: NONE,
      left: START,
      color: doveGray
    },
    listView: {
      zIndex: 10,
      position: 'absolute',
      top: 0,
      overflow: isIos ? 'visible' : 'scroll',
      marginTop: 44,
      marginBottom: isIos ? 5 : MEDIUM_SPACING,
      marginHorizontal: MEDIUM_SPACING,
      backgroundColor: white,
      borderColor: alto,
      borderRadius: BORDER_RADIUS,
      borderTopWidth: NONE,
      borderTopLeftRadius: NONE,
      borderTopRightRadius: NONE,
      borderWidth: 1,
      elevation: 4,
      shadowColor: black,
      shadowOffset: { width: NONE, height: NONE },
      shadowOpacity: 0.2,
      shadowRadius: 3
    },
    textInputContainer: {
      backgroundColor: white,
      borderTopWidth: NONE,
      borderBottomWidth: 1,
      borderBottomColor: active && !deactivateColor ? oceanGreen : alto,
      overflow: 'hidden',
      zIndex: 3,
      marginHorizontal: MEDIUM_SPACING
    },
    row: {
      height: '100%',
      paddingVertical: MEDIUM_SPACING,
      paddingRight: SMALL_SPACING
    },
    separator: {
      backgroundColor: alto,
      height: 0.5
    }
  });

export default styles;

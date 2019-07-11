import { StyleSheet } from 'react-native';
import { alto, doveGray, transparent, thunderbird, emperor, boulder, tundora } from '@constants/colors';

export default StyleSheet.create({
  base: {
    backgroundColor: transparent
  },
  normal: {
    fontWeight: 'normal'
  },
  bold: {
    fontWeight: 'bold'
  },
  borderless: {
    textDecorationLine: 'none'
  },
  center: {
    textAlign: 'center'
  },
  justify: {
    textAlign: 'justify'
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  thunderbirdColor: {
    color: thunderbird
  },
  emperorColor: {
    color: emperor
  },
  doveGrayColor: {
    color: doveGray
  },
  boulderColor: {
    color: boulder
  },
  tundoraColor: {
    color: tundora
  },
  disabledText: {
    color: alto
  },
  uppercase: {
    // textTransform: 'uppercase'
    // Works on android in the new rn version 0.57.4, but there is a bug here
    // Until it is fixed, it will use toUpperCase()
    // https://github.com/facebook/react-native/issues/21966
  },
  capitalize: {
    // Same bug here
    // textTransform: 'capitalize'
  }
});

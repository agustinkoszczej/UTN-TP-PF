import { StyleSheet } from 'react-native';
import { alto, doveGray, transparent, thunderbird, emperor, boulder, tundora } from '@constants/colors';
import fonts from '@config/fonts';

export default StyleSheet.create({
  base: {
    ...fonts.baseFont,
    backgroundColor: transparent
  },
  title: fonts.titleFont,
  subtitle: fonts.subtitleFont,
  divider: fonts.dividerAndSectionFont,
  section: fonts.dividerAndSectionFont,
  dividerSmall: fonts.dividerSmallFont,
  important13: fonts.importantText13Font,
  important12: fonts.importantText12Font,
  primary: fonts.primaryTextAndInputFont,
  secondary: fonts.secondaryTextFont,
  selector: fonts.selectorAndTabFont,
  tab: fonts.selectorAndTabFont,
  primaryButton: fonts.primaryButtonTextFont,
  link: fonts.linkFont,
  secondaryLink: fonts.secondaryLinkFont,
  greenNoLink: fonts.greenTextNoLinkFont,
  error: fonts.textFieldErrorFont,
  disabledButton: fonts.disabledButtonTextFont,
  price: fonts.priceFont,
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

import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';
import fonts from '@config/fonts';

const PADDING_HORIZONTAL = 5;

export const locationProps = {
  numberOfLines: 1,
  ellipsizeMode: 'tail'
};

const iconStyle = {
  width: 20,
  height: 16,
  tintColor: white,
  marginBottom: 2
};

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    ...iconStyle
  },
  type: {
    ...fonts.headerTypeFont,
    paddingHorizontal: PADDING_HORIZONTAL
  },
  location: {
    ...fonts.headerLocationFont,
    maxWidth: '50%'
  },
  angleDown: {
    ...iconStyle,
    marginLeft: 5
  }
});

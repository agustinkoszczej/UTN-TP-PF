import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';
import { verticalScale } from '@utils/scalingUtils';

const ICON_SIZE = 300;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    padding: 20
  },
  titleContent: {
    marginTop: 27
  },
  descriptionContent: {
    marginTop: 12
  },
  icon: {
    height: verticalScale(ICON_SIZE),
    width: verticalScale(ICON_SIZE)
  },
  modifyBtn: {
    marginTop: 32,
    width: '100%'
  }
});

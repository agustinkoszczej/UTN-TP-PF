import { StyleSheet } from 'react-native';
import { white, wildSand, alto } from '@constants/colors';
import { verticalScale } from '@utils/scalingUtils';

const FOOTER_HEIGHT = verticalScale(50);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    marginBottom: 20
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexGrow: 1
  },
  primaryContainer: {
    padding: 15
  },
  footerBtn: {
    backgroundColor: wildSand,
    display: 'flex',
    justifyContent: 'center',
    height: FOOTER_HEIGHT
  },
  button: {
    marginTop: 20,
    width: '100%'
  },
  backgroundImage: {
    width: '100%',
    position: 'absolute'
  },
  bottomFixed: {
    width: '100%',
    backgroundColor: white,
    elevation: 4,
    shadowColor: alto,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    borderTopWidth: 1,
    borderColor: alto,
    justifyContent: 'center'
  }
});

import { StyleSheet } from 'react-native';
import { transparent } from '@constants/colors';
import { scale, verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
  container: {
    padding: scale(30),
    flex: 1,
    height: '100%',
    justifyContent: 'space-around'
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '100%'
  },
  hasAccountTxt: {
    alignSelf: 'center'
  },
  accountExistsContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15
  },
  logInBtn: {
    marginLeft: 5
  },
  signUpBtn: {
    borderRadius: 5,
    width: '100%'
  }
});

import { StyleSheet } from 'react-native';
import { alto, transparent, facebookBlue, googleRed } from '@constants/colors';
import { scale, verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
  background: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: verticalScale(25),
    resizeMode: 'stretch'
  },
  graySeparator: {
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: alto,
    flex: 1,
    width: '100%'
  },
  googleLogInBtn: {
    borderColor: googleRed
  },
  googleBtnText: {
    color: googleRed,
    marginRight: 0
  },
  separatorText: {
    marginHorizontal: scale(10)
  },
  container: {
    padding: scale(30)
  },
  facebookLogInBtn: {
    borderColor: facebookBlue
  },
  facebookBtnText: {
    marginRight: 0,
    color: facebookBlue
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end'
  },
  formElementContainer: {
    backgroundColor: transparent,
    borderBottomColor: facebookBlue,
    borderBottomWidth: 1
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '100%'
  },
  orderBtn: {
    alignSelf: 'center'
  },
  otherLoginOptions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginVertical: verticalScale(20)
  },
  logo: {
    alignSelf: 'center',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(25),
    height: scale(60),
    width: scale(150)
  },
  logInOptionBtn: {
    padding: scale(10),
    borderWidth: 1.5,
    borderRadius: 5,
    width: '48%',
    marginHorizontal: '2%'
  },
  loginBtn: {
    marginVertical: verticalScale(24)
  },
  icon: {
    marginRight: 10
  },
  registerAccount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  separatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  signUpTxt: {
    alignSelf: 'center',
    marginHorizontal: scale(10)
  },
  footerImg: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    height: scale(56),
    width: scale(73),
    zIndex: 1
  }
});

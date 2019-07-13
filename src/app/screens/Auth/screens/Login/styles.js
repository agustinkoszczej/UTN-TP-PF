import { StyleSheet } from 'react-native';
import { transparent, gray, black, white } from '@constants/colors';
import { scale, verticalScale } from '@utils/scalingUtils';

export default StyleSheet.create({
  separatorText: {
    marginHorizontal: scale(10)
  },
  container: {
    padding: scale(30),
    flex: 1,
    height: '100%',
    justifyContent: 'space-around'
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end'
  },
  formElement: {
    backgroundColor: transparent,
    height: verticalScale(42),
    width: '100%',
    color: black
  },
  logo: {
    alignSelf: 'center',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(25),
    height: scale(200),
    width: scale(400)
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
    marginHorizontal: scale(10),
    color: gray
  },
  blackText: {
    color: black
  },
  whiteText: {
    color: white
  }
});

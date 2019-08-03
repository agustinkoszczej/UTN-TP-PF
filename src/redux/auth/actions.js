import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { NavigationActions, StackActions } from 'react-navigation';
import AuthService from '@services/AuthService';
import Routes from '@constants/routes';

export const actions = createTypes(
  completeTypes(['LOGIN', 'RECOVER_PASSWORD', 'SIGN_UP', 'UPDATE_USER', 'GET_USER_INFO'], []),
  '@@AUTH'
);

export const targets = {
  user: 'currentUser',
  recoverPassword: 'recoverPassword',
  signUpUser: 'signUpUser',
  updateUser: 'updateUser'
};

export const actionCreators = {
  login: authData => ({
    type: actions.LOGIN,
    target: targets.user,
    service: AuthService.login,
    payload: authData,
    failureSelector: response => response.data,
    injections: [
      withPostSuccess(async (dispatch, response) => {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Routes.Home })]
          })
        );
        await AuthService.setTokens(response.data);
        dispatch(actionCreators.getUserInfo())
      })
    ]
  }),
  recoverPassword: email => ({
    type: actions.RECOVER_PASSWORD,
    service: AuthService.recoverPassword,
    payload: { email },
    target: targets.recoverPassword,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Routes.Login })]
          })
        );
      })
    ]
  }),
  signUp: signUpData => ({
    type: actions.SIGN_UP,
    target: targets.signUpUser,
    service: AuthService.signUp,
    payload: signUpData,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Routes.Home })]
          })
        );
      })
    ]
  }),
  updateUser: updateUpData => ({
    type: actions.UPDATE_USER,
    target: targets.updateUser,
    service: AuthService.update,
    payload: updateUpData,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(NavigationActions.back());
      })
    ]
  }),
  getUserInfo: () => ({
    type: actions.GET_USER_INFO,
    target: targets.user,
    service: AuthService.getUserInfo
  })
};

export default actionCreators;

import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { NavigationActions, StackActions } from 'react-navigation';
import AuthService from '@services/AuthService';
import { redirectToEspecificTab } from '@utils/navUtils';
import { apiSetup } from '@config/api';
import Routes from '@constants/routes';
import DialogActions from '@redux/dialog/actions';
import { getAuthDialog, authDialogNames } from '@screens/Auth/dialogs';

import { userSerializer } from './utils';

export const actions = createTypes(
  completeTypes(
    [
      'LOGIN',
      'RECOVER_PASSWORD',
      'SIGN_UP',
      'UPDATE_USER',
      'GET_USER_INFO',
      'LOG_OUT',
      'GET_AGENDA',
      'GET_SUPPLIERS',
      'CLEAR_SUPPLIERS',
      'GET_STATS'
    ],
    ['CLEAN_SIGN_UP_ERROR']
  ),
  '@@AUTH'
);

export const targets = {
  user: 'currentUser',
  recoverPassword: 'recoverPassword',
  signUpUser: 'signUpUser',
  signUpUserError: 'signUpUserError',
  updateUser: 'updateUser',
  agenda: 'agenda',
  suppliers: 'suppliers',
  stats: 'stats'
};

export const actionCreators = {
  setUp: () => async dispatch => {
    await apiSetup(dispatch);
    const token = await AuthService.getToken();
    if (token) {
      await AuthService.setTokens(token);
      dispatch(actionCreators.getUserInfo());
    } else {
      dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: Routes.Login })]
        })
      );
    }
  },
  login: authData => ({
    type: actions.LOGIN,
    target: targets.user,
    service: AuthService.login,
    payload: authData,
    failureSelector: response => response.data,
    injections: [
      withPostSuccess(async (dispatch, response) => {
        await AuthService.setTokens(response.data.access_token);
        dispatch(actionCreators.getUserInfo());
      })
    ]
  }),
  recoverPassword: email => ({
    type: actions.RECOVER_PASSWORD,
    service: AuthService.recoverPassword,
    payload: { email },
    target: targets.recoverPassword
  }),
  signUp: signUpData => ({
    type: actions.SIGN_UP,
    target: targets.signUpUser,
    service: AuthService.signUp,
    payload: signUpData,
    failureSelector: response => response.data,
    injections: [
      withPostSuccess(async dispatch =>
        dispatch(
          DialogActions.showDialog(
            getAuthDialog(authDialogNames.FINISH_SIGN_UP)(
              signUpData.fullName,
              signUpData.email,
              signUpData.password
            )
          )
        )
      ),
      withPostFailure(async (dispatch, response) => {
        dispatch(
          DialogActions.showDialog(
            getAuthDialog(authDialogNames.FINISH_SIGN_UP_FAILURE)(response?.data?.internalCode)
          )
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
        dispatch(actionCreators.getUserInfo());
        dispatch(NavigationActions.back());
      })
    ]
  }),
  getUserInfo: () => ({
    type: actions.GET_USER_INFO,
    target: targets.user,
    service: AuthService.getUserInfo,
    successSelector: response => userSerializer(response.data),
    failureSelector: response => response.data,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(actionCreators.getAgenda());
        redirectToEspecificTab(dispatch, Routes.HomeMenu);
      }),
      withPostFailure(async dispatch => {
        await AuthService.logOut();
        dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Routes.Login })]
          })
        );
      })
    ]
  }),
  logOut: () => ({
    type: actions.LOG_OUT,
    target: targets.user,
    service: AuthService.logOut,
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
  cleanSignUpError: () => ({
    type: actions.CLEAN_SIGN_UP_ERROR,
    target: targets.signUpUserError
  }),
  getAgenda: name => ({
    type: actions.GET_AGENDA,
    target: targets.agenda,
    payload: name,
    service: AuthService.getAgenda
  }),
  getSuppliers: name => ({
    type: actions.GET_SUPPLIERS,
    target: targets.suppliers,
    payload: name,
    service: AuthService.getSuppliers,
    successSelector: response => response.data.users
  }),
  clearSuppliers: () => ({
    type: actions.CLEAR_SUPPLIERS,
    target: targets.suppliers
  }),
  getStats: () => ({
    type: actions.GET_STATS,
    target: targets.stats,
    service: AuthService.getStats
  })
};

export default actionCreators;

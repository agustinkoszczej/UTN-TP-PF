import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { NavigationActions, StackActions } from 'react-navigation';
import AuthService from '@services/AuthService';
import { redirectToEspecificTab } from '@utils/navUtils';
import { apiSetup } from '@config/api';
import Routes from '@constants/routes';
import DialogActions from '@redux/dialog/actions';
import ChatActions from '@redux/chat/actions';
import { getAuthDialog, authDialogNames } from '@screens/Auth/dialogs';

import { getPushNotificationHandler } from '../pushNotifications/utils';

import { userSerializer, supplierSerializer } from './utils';

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
      'GET_STATS',
      'GET_SUPPLIER_BY_ID',
      'ADD_CONTACT',
      'DELETE_CONTACT'
    ],
    ['CLEAN_SIGN_UP_ERROR', 'CLEAN_SUPPLIER']
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
  stats: 'stats',
  acceptContact: 'acceptContact',
  deleteContact: 'deleteContact',
  currentSupplier: 'currentSupplier',
  contact: 'contact'
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
    target: targets.recoverPassword,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(NavigationActions.back());
      })
    ]
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
        dispatch(actionCreators.getUserInfo(false));
        dispatch(NavigationActions.back());
      })
    ]
  }),
  getUserInfo: (redirect = true) => ({
    type: actions.GET_USER_INFO,
    target: targets.user,
    service: AuthService.getUserInfo,
    successSelector: response => userSerializer(response.data),
    failureSelector: response => response.data,
    injections: [
      withPostSuccess((dispatch, response, state) => {
        dispatch(actionCreators.getAgenda());
        const { readNotifications } = state.pushNotifications;
        let handler;
        if (redirect) {
          redirectToEspecificTab(dispatch, Routes.HomeMenu);
        } else if (readNotifications.length) {
          const lastNotification = readNotifications[readNotifications.length - 1];
          handler = getPushNotificationHandler(lastNotification, state);
        }
        dispatch(ChatActions.connectPusher(response.data.user_id, handler));
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
  getAgenda: (name, injection) => ({
    type: actions.GET_AGENDA,
    target: targets.agenda,
    payload: name,
    service: AuthService.getAgenda,
    injections: [withPostSuccess(() => injection && injection())]
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
  }),
  acceptRequest: (id, isInProfile) => ({
    type: actions.GET_SUPPLIERS,
    target: targets.acceptContact,
    payload: id,
    service: AuthService.acceptRequest,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(
          actionCreators.getAgenda('', () => {
            dispatch(actionCreators.getSupplierById(id));
            if (!isInProfile) dispatch(NavigationActions.navigate({ routeName: Routes.SupplierProfile }));
          })
        );
      })
    ]
  }),
  deleteContact: id => ({
    type: actions.GET_SUPPLIERS,
    target: targets.deleteContact,
    payload: id,
    service: AuthService.deleteContact,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(actionCreators.getAgenda('', () => dispatch(actionCreators.getSupplierById(id))));
      })
    ]
  }),
  getSupplierById: id => (dispatch, getState) => {
    dispatch({
      type: actions.GET_SUPPLIER_BY_ID,
      target: targets.currentSupplier,
      payload: id,
      service: AuthService.getSupplierById,
      successSelector: response => supplierSerializer(response.data.user, getState)
    });
  },
  addContact: id => ({
    type: actions.ADD_CONTACT,
    target: targets.contact,
    payload: id,
    service: AuthService.addContact,
    injections: [
      withPostSuccess(dispatch => {
        dispatch(actionCreators.getAgenda('', () => dispatch(actionCreators.getSupplierById(id))));
      })
    ]
  }),
  cleanSupplier: () => ({
    type: actions.CLEAN_SUPPLIER,
    target: targets.currentSupplier
  })
};

export default actionCreators;

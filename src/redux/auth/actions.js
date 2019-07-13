import { completeTypes, createTypes } from 'redux-recompose';
import AuthService from '@services/AuthService';

export const actions = createTypes(completeTypes(['LOGIN'], []), '@@AUTH');

export const targets = {
  user: 'currentUser'
};

export const actionCreators = {
  login: authData => ({
    type: actions.LOGIN,
    target: targets.user,
    service: AuthService.login,
    payload: authData
  })
};

export default actionCreators;

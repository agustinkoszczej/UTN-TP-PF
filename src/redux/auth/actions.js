import { completeTypes, createTypes, withPostSuccess } from 'redux-recompose';
import { NavigationActions, StackActions } from 'react-navigation';
import AuthService from '@services/AuthService';
import Routes from '@constants/routes';

export const actions = createTypes(completeTypes(['LOGIN'], []), '@@AUTH');

export const targets = {
  user: 'currentUser'
};

export const actionCreators = {
  login: authData => ({
    type: actions.LOGIN,
    target: targets.user,
    service: AuthService.login,
    payload: authData,
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
  })
};

export default actionCreators;

import dialogTypes from '@components/ConnectedDialog/dialogTypes';
import store from '@redux/store';
import AuthActions from '@redux/auth/actions';

import { strings } from './constants';

export const authDialogNames = {
  FINISH_SIGN_UP: 'finishSignUp'
};

export const getAuthDialog = dialogType =>
  ({
    [authDialogNames.FINISH_SIGN_UP]: (name, username, password) => ({
      dialogType: dialogTypes.SIMPLE_DIALOG,
      dialogContent: {
        title: strings.hello(name),
        message: strings.welcomeMessage,
        acceptText: strings.start,
        onAcceptDialog: () => store.dispatch(AuthActions.login({ username, password }))
      }
    })
  }[dialogType]);

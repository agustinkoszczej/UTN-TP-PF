import dialogTypes from '@components/ConnectedDialog/dialogTypes';
import store from '@redux/store';
import AuthActions from '@redux/auth/actions';

import { strings } from './constants';

export const authDialogNames = {
  FINISH_SIGN_UP: 'finishSignUp',
  FINISH_SIGN_UP_FAILURE: 'finishSignUpFailure'
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
    }),
    [authDialogNames.FINISH_SIGN_UP_FAILURE]: code => ({
      dialogType: dialogTypes.SIMPLE_DIALOG,
      dialogContent: {
        title: strings.signUpFail,
        message: code === 'sign_up_error' ? strings.repeatedEmail : strings.invalidQR,
        acceptText: strings.backToSignUp
      }
    })
  }[dialogType]);

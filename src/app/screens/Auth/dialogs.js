import dialogTypes from '@components/ConnectedDialog/dialogTypes';

import { strings } from './constants';

export const authDialogNames = {
  FINISH_SIGN_UP: 'finishSignUp'
};

export const getAuthDialog = dialogType =>
  ({
    [authDialogNames.ONBOARDING_USER]: name => ({
      dialogType: dialogTypes.FINISH_SIGN_UP,
      dialogContent: {
        title: strings.welcome(name),
        message: strings.welcomeMessage,
        acceptText: strings.start
      }
    })
  }[dialogType]);

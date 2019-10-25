import { createTypes, completeTypes } from 'redux-recompose';
import PushNotificationsService from '@services/PushNotificationsService';
import { getPushNotificationHandler } from '@redux/pushNotifications/utils';
import DialogActions from '@redux/dialog/actions';

import { pushMessage } from '../../utils/pushNotificationUtils';

export const actions = createTypes(
  completeTypes(['UPDATE_TOKEN', 'DELETE_TOKEN'], ['REGISTER', 'NOTIFICATION_RECEIVED']),
  '@@PUSH_NOTIFICATIONS'
);

const TARGETS = {
  TOKEN: 'token',
  USER: 'user'
};

export const actionCreators = {
  register: token => dispatch => {
    PushNotificationsService.setDeviceId(token);
    dispatch({
      type: actions.REGISTER,
      target: TARGETS.TOKEN,
      payload: token
    });
  },
  updateToken: () => async dispatch => {
    const token = await PushNotificationsService.getDeviceId();
    dispatch({
      type: actions.UPDATE_TOKEN,
      target: TARGETS.USER,
      payload: token,
      service: PushNotificationsService.updateDeviceToken
    });
  },
  deleteToken: () => async dispatch => {
    const token = await PushNotificationsService.getDeviceId();
    dispatch({
      type: actions.DELETE_TOKEN,
      target: TARGETS.USER,
      payload: token,
      service: PushNotificationsService.deleteDeviceToken
    });
  },
  notificationReceived: notification => dispatch => {
    /**
     * if the push was tapped by the user (userInteraction flag) trigger the push action
     * if the push was not tapped by the user:
     * a- if the push was not received while the app is in foreground it will appear in the notification bar
     * b- if the push was received while the app is in foreground it wont appear in the notification bar so
     *    1- android: trigger a local notification that will appear in the notification bar
     *    2- ios: display an alert
     */
    const handler = getPushNotificationHandler(notification);
    const message = pushMessage(notification);
    if (notification.userInteraction) {
      dispatch(DialogActions.closeDialog());
      PushNotificationsService.cancelAllPushNotifications();
      handler(dispatch);
    } else {
      PushNotificationsService.sendPushNotificationToDevices(notification, handler, dispatch, message);
      // update last order status when a push is received and app is open - without user interaction
    }
    dispatch({
      type: actions.NOTIFICATION_RECEIVED,
      payload: { notification }
    });
  }
};

export default actionCreators;

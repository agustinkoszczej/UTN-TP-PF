import { Platform, Alert, PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import api from '@config/api';
import { isAndroid, isIos } from '@constants/platform';

const DEVICE_ID_STORAGE_KEY = '@Push:token';

const USER_PATH = '/users';

const setDeviceId = id => AsyncStorage.setItem(DEVICE_ID_STORAGE_KEY, JSON.stringify(id));
const getDeviceId = () => AsyncStorage.getItem(DEVICE_ID_STORAGE_KEY).then(JSON.parse);

const updateDeviceToken = token => {
  const data = {
    device_type: Platform.OS,
    device_token: token
  };
  return api.put(`${USER_PATH}/add_device_token`, data);
};
const cancelAllPushNotifications = () => PushNotification.cancelAllLocalNotifications();

const setApplicationIconBadgeNumber = number => {
  if (isIos) PushNotificationIOS.setApplicationIconBadgeNumber(number);
};

const deleteDeviceToken = token => api.put(`${USER_PATH}/delete_device_token`, { device_token: token });

const displayPushNotificationPrompt = message =>
  new Promise(resolve => {
    Alert.alert(
      message,
      '',
      [
        {
          text: 'Abrir',
          onPress() {
            resolve(true);
          }
        },
        {
          text: 'Cerrar',
          style: 'cancel',
          onPress() {
            resolve();
          }
        }
      ],
      { cancelable: false }
    );
  });

const sendPushNotificationToDevices = (notification, handler, dispatch, message) => {
  if (isAndroid) {
    PushNotification.localNotification(notification);
  } else {
    displayPushNotificationPrompt(message).then(triggerPushAction => {
      if (triggerPushAction) {
        handler(dispatch, message);
      }
    });
  }
};

export default {
  updateDeviceToken,
  deleteDeviceToken,
  displayPushNotificationPrompt,
  setDeviceId,
  getDeviceId,
  sendPushNotificationToDevices,
  cancelAllPushNotifications,
  setApplicationIconBadgeNumber
};

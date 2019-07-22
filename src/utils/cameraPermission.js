import { Alert } from 'react-native';
import Permissions from 'react-native-permissions';
import OpenSettings from 'react-native-open-settings';
import { PERMISSION_STATUS } from '@constants/permissions';
import { isIos, isAndroid } from '@constants/platform';

const strings = {
  geolocationRestrictedAlertTitle: 'Permisos de localización',
  geolocationRestrictedAlertContent: 'Necesitamos permisos para acceder a tu ubicación actual',
  geolocationRestrictedAlertDeny: 'No',
  geolocationRestrictedAlertOpenSettings: 'Abrir configuración',
  geolocationBlockedAlertTitle: '¡Ups! Lo sentimos',
  geolocationBlockedAlertContent: 'Es imposible acceder a tu localización.',
  cameraRestrictedAlertTitle: 'Permisos de cámara',
  cameraRestrictedAlertContent: 'Necesitamos permisos para acceder a tu cámara',
  cameraRestrictedAlertDeny: 'No',
  cameraRestrictedAlertOpenSettings: 'Abrir configuración',
  cameraBlockedAlertTitle: '¡Ups! Lo sentimos',
  cameraBlockedAlertContent: 'Es imposible acceder a tu cámara.',
  permissionsAccepted: 'Permisos Concedidos'
};

const alertForRestrictedPermission = async () => {
  await Alert.alert(strings.cameraRestrictedAlertTitle, strings.cameraRestrictedAlertContent, [
    {
      text: strings.cameraRestrictedAlertDeny,
      style: 'cancel'
    },
    {
      text: strings.cameraRestrictedAlertOpenSettings,
      onPress: () => (isIos ? Permissions.openSettings() : OpenSettings.openSettings())
    }
  ]);
};

const alertBlockedPermission = () => {
  Alert.alert(strings.cameraBlockedAlertTitle, strings.cameraBlockedAlertContent);
};

const requestCameraPermission = (navigateToCamera, checkCamera) => {
  if (checkCamera === PERMISSION_STATUS.AUTHORIZED) {
    Permissions.request('microphone').then(responseMicrophone => {
      if (responseMicrophone === PERMISSION_STATUS.AUTHORIZED) navigateToCamera();
    });
  } else {
    Permissions.request('camera').then(responseCamera => {
      if (responseCamera === PERMISSION_STATUS.AUTHORIZED) {
        Permissions.request('microphone').then(responseMicrophone => {
          if (responseMicrophone === PERMISSION_STATUS.AUTHORIZED) navigateToCamera();
        });
      }
    });
  }
};

export const safeCameraRequest = navigateToCamera => {
  Permissions.check('camera').then(response => {
    switch (response) {
      case PERMISSION_STATUS.AUTHORIZED:
        requestCameraPermission(navigateToCamera, response);
        break;
      case PERMISSION_STATUS.RESTRICTED:
        if (isAndroid) alertForRestrictedPermission();
        else alertBlockedPermission();
        break;
      case PERMISSION_STATUS.DENIED:
        if (isIos) alertForRestrictedPermission();
        else requestCameraPermission(navigateToCamera, response);
        break;
      default:
        requestCameraPermission(navigateToCamera, response);
        break;
    }
  });
};

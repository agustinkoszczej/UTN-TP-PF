import { screensNavOptions } from '@config/navigation';
import Routes from '@constants/routes';

export const getCurrentRouteName = navigationState => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

export function inferRoute(screenObj) {
  const screenName = Object.keys(screenObj)[0];
  return {
    [Routes[screenName]]: {
      screen: screenObj[screenName],
      navigationOptions: screensNavOptions[Routes[screenName]]
    }
  };
}

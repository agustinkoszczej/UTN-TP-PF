import { NavigationActions, StackActions } from 'react-navigation';
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

export const redirectToEspecificTab = (dispatch, route, params = null) =>
  Promise.all([
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: Routes.Home,
            params
          })
        ]
      })
    )
  ]).then(() => dispatch(NavigationActions.navigate({ routeName: route })));
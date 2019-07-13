import {
  childTabsNavigationOptions,
  screensNavOptions,
  stackNavConfig,
  tabNavConfig,
  topTabNavConfig
} from '@config/navigation';
import Routes from '@constants/routes';
import { inferRoute } from '@utils/navUtils';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';

import Login from './screens/Auth/screens/Login';
import RecoverPassword from './screens/Auth/screens/RecoverPassword';
import SignUp from './screens/Auth/screens/SignUp';
import ActualOrders from './screens/Home/screens/Orders/screens/ActualOrders';
import PastOrders from './screens/Home/screens/Orders/screens/PastOrders';
import Profile from './screens/Home/screens/Profile';
import InitialLoading from './screens/InitialLoading';

export default createStackNavigator(
  {
    ...inferRoute({ Login }),
    ...inferRoute({ InitialLoading }),
    ...inferRoute({ SignUp }),
    ...inferRoute({ RecoverPassword }),
    [Routes.Home]: {
      screen: createBottomTabNavigator(
        {
          [Routes.Orders]: {
            screen: createMaterialTopTabNavigator(
              {
                ...inferRoute({ ActualOrders }),
                ...inferRoute({ PastOrders })
              },
              topTabNavConfig
            ),
            navigationOptions: screensNavOptions[Routes.Orders]
          },
          ...inferRoute({ Profile })
        },
        tabNavConfig
      ),
      navigationOptions: childTabsNavigationOptions
    }
  },
  stackNavConfig
);

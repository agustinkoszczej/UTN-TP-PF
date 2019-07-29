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
import ScannerQR from './components/ScannerQR';
import CurrentOrders from './screens/Home/screens/Orders/screens/CurrentOrders';
import PastOrders from './screens/Home/screens/Orders/screens/PastOrders';
import Configuration from './screens/Home/screens/Profile/screens/Configuration';
import Profile from './screens/Home/screens/Profile';
import InitialLoading from './screens/InitialLoading';

export default createStackNavigator(
  {
    ...inferRoute({ Login }),
    ...inferRoute({ InitialLoading }),
    ...inferRoute({ SignUp }),
    ...inferRoute({ RecoverPassword }),
    ...inferRoute({ ScannerQR }),
    ...inferRoute({ Configuration }),
    [Routes.Home]: {
      screen: createBottomTabNavigator(
        {
          [Routes.Orders]: {
            screen: createMaterialTopTabNavigator(
              {
                ...inferRoute({ CurrentOrders }),
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

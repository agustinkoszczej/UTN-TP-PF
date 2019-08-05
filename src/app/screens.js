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
import ChooseConfiguration from './screens/Home/screens/Profile/screens/ChooseConfiguration';
import Profile from './screens/Home/screens/Profile';
import HomeMenu from './screens/Home/screens/HomeMenu';
import Chats from './screens/Home/screens/Chats';
import InitialLoading from './screens/InitialLoading';
import CurrentAuctions from './screens/Home/screens/Auctions/screens/CurrentAuctions';
import PastAuctions from './screens/Home/screens/Auctions/screens/PastAuctions';

export default createStackNavigator(
  {
    ...inferRoute({ InitialLoading }),
    ...inferRoute({ Login }),
    ...inferRoute({ SignUp }),
    ...inferRoute({ RecoverPassword }),
    ...inferRoute({ ScannerQR }),
    ...inferRoute({ Configuration }),
    ...inferRoute({ ChooseConfiguration }),
    [Routes.Home]: {
      screen: createBottomTabNavigator(
        {
          ...inferRoute({ Chats }),
          [Routes.Auctions]: {
            screen: createMaterialTopTabNavigator(
              {
                ...inferRoute({ CurrentAuctions }),
                ...inferRoute({ PastAuctions })
              },
              topTabNavConfig
            ),
            navigationOptions: screensNavOptions[Routes.Auctions]
          },
          ...inferRoute({ HomeMenu }),
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

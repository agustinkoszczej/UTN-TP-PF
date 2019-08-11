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
import ActiveOrders from './screens/Home/screens/Orders/screens/ActiveOrders';
import PastOrders from './screens/Home/screens/Orders/screens/PastOrders';
import CreateOrder from './screens/Home/screens/Orders/screens/CreateOrder';
import Configuration from './screens/Home/screens/Profile/screens/Configuration';
import ChooseConfiguration from './screens/Home/screens/Profile/screens/ChooseConfiguration';
import Profile from './screens/Home/screens/Profile';
import HomeMenu from './screens/Home/screens/HomeMenu';
import Chats from './screens/Home/screens/Chats';
import InitialLoading from './screens/InitialLoading';
import ActiveAuctions from './screens/Home/screens/Auctions/screens/ActiveAuctions';
import PastAuctions from './screens/Home/screens/Auctions/screens/PastAuctions';
import CreateAuction from './screens/Home/screens/Auctions/screens/CreateAuction';

export default createStackNavigator(
  {
    ...inferRoute({ InitialLoading }),
    ...inferRoute({ Login }),
    ...inferRoute({ SignUp }),
    ...inferRoute({ RecoverPassword }),
    ...inferRoute({ ScannerQR }),
    ...inferRoute({ Configuration }),
    ...inferRoute({ ChooseConfiguration }),
    ...inferRoute({ CreateOrder }),
    ...inferRoute({ CreateAuction }),
    [Routes.Home]: {
      screen: createBottomTabNavigator(
        {
          ...inferRoute({ Chats }),
          [Routes.Auctions]: {
            screen: createMaterialTopTabNavigator(
              {
                ...inferRoute({ ActiveAuctions }),
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
                ...inferRoute({ ActiveOrders }),
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

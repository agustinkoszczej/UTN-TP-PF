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

// Auth
import Login from './screens/Auth/screens/Login';
import RecoverPassword from './screens/Auth/screens/RecoverPassword';
import SignUp from './screens/Auth/screens/SignUp';
import ScannerQR from './components/ScannerQR';
import InitialLoading from './screens/InitialLoading';
// Orders
import ActiveOrders from './screens/Home/screens/Orders/screens/ActiveOrders';
import PastOrders from './screens/Home/screens/Orders/screens/PastOrders';
import CreateOrder from './screens/Home/screens/Orders/screens/CreateOrder';
import OrderDetail from './screens/Home/screens/Orders/screens/OrderDetail';
// Profile
import Configuration from './screens/Home/screens/Profile/screens/Configuration';
import ChooseConfiguration from './screens/Home/screens/Profile/screens/ChooseConfiguration';
import Profile from './screens/Home/screens/Profile';
import SupplierProfile from './screens/Home/screens/Profile/screens/SupplierProfile';
// Menu
import HomeMenu from './screens/Home/screens/HomeMenu';
import Search from './screens/Home/screens/HomeMenu/screens/Search';
import ProductDetail from './screens/Home/screens/HomeMenu/screens/ProductDetail';
// Chats
import Chats from './screens/Home/screens/Chats';
// Auctions
import ActiveAuctions from './screens/Home/screens/Auctions/screens/ActiveAuctions';
import ExpiredAuctions from './screens/Home/screens/Auctions/screens/ExpiredAuctions';
import FinishedAuctions from './screens/Home/screens/Auctions/screens/FinishedAuctions';
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
    ...inferRoute({ OrderDetail }),
    ...inferRoute({ Search }),
    ...inferRoute({ ProductDetail }),
    ...inferRoute({ SupplierProfile }),
    [Routes.Home]: {
      screen: createBottomTabNavigator(
        {
          ...inferRoute({ Chats }),
          [Routes.Auctions]: {
            screen: createMaterialTopTabNavigator(
              {
                ...inferRoute({ ActiveAuctions }),
                ...inferRoute({ FinishedAuctions }),
                ...inferRoute({ ExpiredAuctions })
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

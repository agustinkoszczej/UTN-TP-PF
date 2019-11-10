import {
  childTabsNavigationOptions,
  screensNavOptions,
  stackNavConfig,
  tabNavConfig,
  topTabNavConfig
} from '@config/navigation';
import Routes from '@constants/routes';
import { inferRoute } from '@utils/navUtils';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';

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
import AgendaRequest from './screens/Home/screens/HomeMenu/screens/AgendaRequest';
// Chats
import Chats from './screens/Home/screens/Chats';
import SupplierChat from './screens/Home/screens/Chats/screens/SupplierChat';
// Auctions
import ActiveAuctions from './screens/Home/screens/Auctions/screens/ActiveAuctions';
import ExpiredAuctions from './screens/Home/screens/Auctions/screens/ExpiredAuctions';
import ClosedAuctions from './screens/Home/screens/Auctions/screens/ClosedAuctions';
import CreateAuction from './screens/Home/screens/Auctions/screens/CreateAuction';
import AuctionDetail from './screens/Home/screens/Auctions/screens/AuctionDetail';
import Bids from './screens/Home/screens/Auctions/screens/AuctionDetail/screens/Bids';

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
    ...inferRoute({ AuctionDetail }),
    ...inferRoute({ SupplierProfile }),
    ...inferRoute({ SupplierChat }),
    ...inferRoute({ Bids }),
    ...inferRoute({ AgendaRequest }),
    [Routes.Home]: {
      screen: createBottomTabNavigator(
        {
          ...inferRoute({ Chats }),
          [Routes.Auctions]: {
            screen: createMaterialTopTabNavigator(
              {
                ...inferRoute({ ActiveAuctions }),
                ...inferRoute({ ClosedAuctions }),
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

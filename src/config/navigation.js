import { getActiveChildNavigationOptions, HeaderBackButton } from 'react-navigation';
import TabBarIcon from '@components/TabBarIcon';
import { black, boulder, dustyGray, white } from '@constants/colors';
import Routes from '@constants/routes';
import statusBarConfig from '@constants/statusBar';
import { strings } from '@constants/screenStrings';

const homeScreensHeaderTitleStyle = {
  alignSelf: 'center',
  textAlign: 'center',
  flex: 1
};

const emptyTitleHeader = {
  title: '',
  headerStyle: {
    backgroundColor: white,
    elevation: 0,
    borderBottomColor: white,
    shadowOpacity: 0
  }
};

// Default nav options for all screens
const defaultNavOptions = ({ navigation }) => ({
  title: strings[navigation.state.routeName],
  headerStyle: {
    backgroundColor: white
  },
  headerLeft: HeaderBackButton,
  headerTintColor: dustyGray,
  headerBackTitle: 'Volver'
});

// Default tab options for all tabs
const defaultTabOptions = ({ navigation }) => ({
  tabBarOptions: {
    style: { backgroundColor: white, paddingVertical: 5 },
    activeTintColor: black,
    inactiveTintColor: boulder
  },
  headerLeft: null,
  headerTitle: strings[navigation.state.routeName],
  tabBarIcon: props => TabBarIcon({ route: navigation.state.routeName, ...props })
});

// Default tab options for all tabs
const topTabOptions = ({ navigation }) => ({
  tabBarOptions: {
    style: {
      backgroundColor: white,
      borderBottomWidth: 1,
      borderBottomColor: black,
      paddingTop: 10,
      shadowColor: black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4
    },
    activeTintColor: black,
    inactiveTintColor: boulder,
    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: black,
      height: 4
    },
    tabStyle: {
      width: 130,
      padding: 0
    }
  },
  headerLeft: null,
  title: strings[navigation.state.routeName]
});

export const screensNavOptions = {
  [Routes.Login]: { header: null },
  [Routes.InitialLoading]: { header: null },
  [Routes.SignUp]: { header: null },
  [Routes.RecoverPassword]: emptyTitleHeader,
  [Routes.Orders]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.Orders],
    headerTitleStyle: homeScreensHeaderTitleStyle
  },
  [Routes.Profile]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.Profile],
    headerTitleStyle: homeScreensHeaderTitleStyle
  },
  [Routes.Chats]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.Chats],
    headerTitleStyle: homeScreensHeaderTitleStyle
  },
  [Routes.Auctions]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.Auctions],
    headerTitleStyle: homeScreensHeaderTitleStyle
  },
  [Routes.HomeMenu]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.HomeMenu],
    headerTitleStyle: homeScreensHeaderTitleStyle
  }
};

export const stackNavConfig = {
  navigationOptions: defaultNavOptions
};

export const childTabsNavigationOptions = ({ navigation, screenProps }) =>
  getActiveChildNavigationOptions(navigation, screenProps);

export const tabNavConfig = {
  tabBarPosition: 'bottom',
  navigationOptions: defaultTabOptions
};

export const topTabNavConfig = {
  tabBarPosition: 'top',
  navigationOptions: topTabOptions
};

export const statusBarStyles = {
  [Routes.Orders]: statusBarConfig.whiteStatusBar,
  [Routes.Profile]: statusBarConfig.whiteStatusBar,
  default: statusBarConfig.whiteStatusBar
};

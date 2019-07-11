import { getActiveChildNavigationOptions, HeaderBackButton } from 'react-navigation';
import TabBarIcon from '@components/TabBarIcon';
import { black, boulder, dustyGray, oceanGreen, thunderbird, white } from '@constants/colors';
import Routes from '@constants/routes';
import statusBarConfig from '@constants/statusBar';

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
  title: navigation.state.routeName,
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
    activeTintColor: thunderbird,
    inactiveTintColor: boulder
  },
  headerLeft: null,
  title: navigation.state.routeName,
  tabBarIcon: props => TabBarIcon({ route: navigation.state.routeName, ...props })
});

// Default tab options for all tabs
const topTabOptions = ({ navigation }) => ({
  tabBarOptions: {
    style: {
      backgroundColor: white,
      borderBottomWidth: 1,
      borderBottomColor: oceanGreen,
      paddingTop: 10,
      shadowColor: black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4
    },
    activeTintColor: oceanGreen,
    inactiveTintColor: boulder,
    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: oceanGreen,
      height: 4
    },
    tabStyle: {
      width: 130,
      padding: 0
    }
  },
  headerLeft: null,
  title: navigation.state.routeName
});

export const screensNavOptions = {
  [Routes.Menu]: {
    gesturesEnabled: false,
    headerStyle: {
      backgroundColor: oceanGreen,
      elevation: 0
    }
  },
  [Routes.Login]: { header: null },
  [Routes.InitialLoading]: { header: null },
  [Routes.SignUp]: { header: null },
  [Routes.RecoverPassword]: emptyTitleHeader,
  [Routes.PasswordRecoverySuccess]: { header: null },
  [Routes.Orders]: {
    gesturesEnabled: false,
    tabBarLabel: 'Pedidos',
    headerTitleStyle: homeScreensHeaderTitleStyle
  },
  [Routes.Profile]: {
    gesturesEnabled: false,
    tabBarLabel: 'Perfil',
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
  [Routes.Home]: statusBarConfig.greenStatusBar,
  [Routes.Menu]: statusBarConfig.greenStatusBar,
  [Routes.Orders]: statusBarConfig.whiteStatusBar,
  default: statusBarConfig.whiteStatusBar
};

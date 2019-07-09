import { getActiveChildNavigationOptions, HeaderBackButton } from 'react-navigation';
import CustomHeader from '@components/CustomHeader';
import TabBarIcon from '@components/TabBarIcon';
import { black, boulder, dustyGray, headerBorder, oceanGreen, thunderbird, white } from '@constants/colors';
import { isIos } from '@constants/platform';
import Routes from '@constants/routes';
import statusBarConfig from '@constants/statusBar';

import I18n from './i18n';

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

const overlapHeader = {
  title: '',
  headerStyle: {
    backgroundColor: white,
    elevation: 4,
    borderBottomColor: headerBorder,
    shadowOpacity: isIos && 1
  }
};

// Default nav options for all screens
const defaultNavOptions = ({ navigation }) => ({
  title: I18n.t(`app:${navigation.state.routeName}`),
  headerStyle: {
    backgroundColor: white
  },
  headerLeft: HeaderBackButton,
  headerTintColor: dustyGray,
  headerBackTitle: I18n.t('app:back'),
});

// Default tab options for all tabs
const defaultTabOptions = ({ navigation }) => ({
  tabBarOptions: {
    style: { backgroundColor: white, paddingVertical: 5 },
    activeTintColor: thunderbird,
    inactiveTintColor: boulder
  },
  headerLeft: null,
  title: I18n.t(`app:${navigation.state.routeName}`),
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
  title: I18n.t(`app:${navigation.state.routeName}`)
});

export const screensNavOptions = {
  [Routes.Menu]: {
    gesturesEnabled: false,
    headerTitle: CustomHeader,
    headerStyle: {
      backgroundColor: oceanGreen,
      elevation: 0
    }
  },
  [Routes.Login]: { header: null },
  [Routes.InitialLoading]: { header: null },
  [Routes.SignUp]: { header: null },
  [Routes.RecoverPassword]: emptyTitleHeader,
  [Routes.RecoverPasswordCodeVerification]: emptyTitleHeader,
  [Routes.PasswordRecoverySuccess]: { header: null },
  [Routes.Orders]: {
    gesturesEnabled: false,
    tabBarLabel: I18n.t(`app:ordersLabel`),
    headerTitleStyle: homeScreensHeaderTitleStyle
  },
  [Routes.Profile]: {
    gesturesEnabled: false,
    tabBarLabel: I18n.t(`app:profileLabel`),
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

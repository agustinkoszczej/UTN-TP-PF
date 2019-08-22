import React from 'react';
import { getActiveChildNavigationOptions, HeaderBackButton } from 'react-navigation';
import TabBarIcon from '@components/TabBarIcon';
import AddButton from '@components/AddButton';
import SearchButton from '@components/SearchButton';
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
const defaultTabOptions = () => ({
  tabBarOptions: {
    style: { backgroundColor: white, paddingVertical: 5 },
    activeTintColor: black,
    inactiveTintColor: boulder
  }
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
    headerTitleStyle: homeScreensHeaderTitleStyle,
    tabBarIcon: props => TabBarIcon({ route: Routes.Orders, ...props }),
    headerTitle: strings[Routes.Orders],
    tabBarOptions: {
      style: { backgroundColor: white, paddingVertical: 5 },
      activeTintColor: black,
      inactiveTintColor: boulder
    },
    headerRight: <AddButton />
  },
  [Routes.Profile]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.Profile],
    headerTitleStyle: homeScreensHeaderTitleStyle,
    tabBarIcon: props => TabBarIcon({ route: Routes.Profile, ...props }),
    headerTitle: strings[Routes.Profile],
    tabBarOptions: {
      style: { backgroundColor: white, paddingVertical: 5 },
      activeTintColor: black,
      inactiveTintColor: boulder
    }
  },
  [Routes.Chats]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.Chats],
    headerTitleStyle: homeScreensHeaderTitleStyle,
    tabBarIcon: props => TabBarIcon({ route: Routes.Chats, ...props }),
    headerTitle: strings[Routes.Chats],
    tabBarOptions: {
      style: { backgroundColor: white, paddingVertical: 5 },
      activeTintColor: black,
      inactiveTintColor: boulder
    },
    lazy: true
  },
  [Routes.Auctions]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.Auctions],
    headerTitleStyle: homeScreensHeaderTitleStyle,
    tabBarIcon: props => TabBarIcon({ route: Routes.Auctions, ...props }),
    headerTitle: strings[Routes.Auctions],
    tabBarOptions: {
      style: { backgroundColor: white, paddingVertical: 5 },
      activeTintColor: black,
      inactiveTintColor: boulder
    },
    headerRight: <AddButton />,
    lazy: true
  },
  [Routes.HomeMenu]: {
    gesturesEnabled: false,
    tabBarLabel: strings[Routes.HomeMenu],
    headerTitleStyle: homeScreensHeaderTitleStyle,
    tabBarIcon: props => TabBarIcon({ route: Routes.HomeMenu, ...props }),
    headerTitle: strings[Routes.HomeMenu],
    tabBarOptions: {
      style: { backgroundColor: white, paddingVertical: 5 },
      activeTintColor: black,
      inactiveTintColor: boulder
    },
    headerRight: <SearchButton />
  },
  [Routes.ActiveOrders]: {
    tabBarLabel: strings[Routes.ActiveOrders],
    tabBarOptions: {
      style: {
        backgroundColor: white,
        borderBottomWidth: 1,
        borderBottomColor: black,
        shadowColor: black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4
      },
      activeTintColor: black,
      inactiveTintColor: black,
      indicatorStyle: {
        backgroundColor: black,
        height: 4
      }
    }
  },
  [Routes.PastOrders]: {
    tabBarLabel: strings[Routes.PastOrders],
    tabBarOptions: {
      style: {
        backgroundColor: white,
        borderBottomWidth: 1,
        borderBottomColor: black,
        shadowColor: black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4
      },
      activeTintColor: black,
      inactiveTintColor: black,
      indicatorStyle: {
        backgroundColor: black,
        height: 4
      }
    }
  },
  [Routes.PastAuctions]: {
    tabBarLabel: strings[Routes.PastAuctions],
    tabBarOptions: {
      style: {
        backgroundColor: white,
        borderBottomWidth: 1,
        borderBottomColor: black,
        shadowColor: black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4
      },
      activeTintColor: black,
      inactiveTintColor: black,
      indicatorStyle: {
        backgroundColor: black,
        height: 4
      }
    }
  },
  [Routes.ActiveAuctions]: {
    tabBarLabel: strings[Routes.ActiveAuctions],
    tabBarOptions: {
      style: {
        backgroundColor: white,
        borderBottomWidth: 1,
        borderBottomColor: black,
        shadowColor: black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4
      },
      activeTintColor: black,
      inactiveTintColor: black,
      indicatorStyle: {
        backgroundColor: black,
        height: 4
      }
    }
  },
  [Routes.CreateAuction]: {
    title: strings[Routes.CreateAuction]
  },
  [Routes.CreateOrder]: {
    title: strings[Routes.CreateOrder]
  },
  [Routes.Configuration]: {
    title: strings[Routes.Configuration]
  },
  [Routes.ChooseConfiguration]: {
    title: strings[Routes.ChooseConfiguration]
  },
  [Routes.OrderDetail]: {
    title: strings[Routes.OrderDetail]
  },
  [Routes.Search]: {
    title: strings[Routes.Search]
  },
  [Routes.ProductDetail]: {
    title: strings[Routes.ProductDetail]
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

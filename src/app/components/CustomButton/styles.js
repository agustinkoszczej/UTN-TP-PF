import { StyleSheet } from 'react-native';
import { transparent, alto, white, black } from '@constants/colors';

const iconSize = 30;

const borderlessStyle = {
  borderWidth: 0,
  backgroundColor: transparent,
  height: 30,
  width: 'auto'
};

const sideComponentStyle = {
  flex: 0.25,
  justifyContent: 'center',
  marginHorizontal: 10
};

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4
  },
  loadingContainer: {
    justifyContent: 'center'
  },
  icon: {
    height: iconSize,
    width: iconSize
  },
  iconDisabled: {
    tintColor: alto
  },
  primaryBtn: {
    backgroundColor: black,
    borderRadius: 4,
    color: white
  },
  secondaryBtn: {
    borderWidth: 2,
    borderColor: alto,
    backgroundColor: white
  },
  disabled: {
    backgroundColor: alto,
    borderWidth: 0
  },
  borderless: borderlessStyle,
  borderlessWrapper: {
    width: 'auto'
  },
  borderlessText: {
    textDecorationLine: 'none',
    color: white
  },
  boldText: {
    fontWeight: 'bold'
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftComponent: {
    ...sideComponentStyle,
    alignItems: 'flex-start'
  },
  rightComponent: {
    ...sideComponentStyle,
    alignItems: 'flex-end'
  }
});

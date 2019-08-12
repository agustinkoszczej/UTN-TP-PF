import { StyleSheet } from 'react-native';
import { separator } from '@constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  graySeparator: {
    backgroundColor: separator,
    alignSelf: 'center',
    height: 1,
    flex: 1,
    width: '100%'
  },
  separatorWithText: {
    marginLeft: 10
  },
  text: {
    flexShrink: 1
  }
});

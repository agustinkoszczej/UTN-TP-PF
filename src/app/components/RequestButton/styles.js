import { StyleSheet } from 'react-native';
import { white, red } from '@constants/colors';

export default StyleSheet.create({
  icon: {
    marginLeft: 20,
    width: 30,
    height: 30
  },
  white: {
    color: white
  },
  counter: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    backgroundColor: red,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

import { StyleSheet } from 'react-native';
import { black, white } from '@constants/colors';

export default StyleSheet.create({
  send: {
    width: 28,
    height: 28,
    marginRight: 10,
    marginBottom: 8,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  earlierContainer: {
    // width: 70,
    // height: 100,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: black
  },
  earlierText: {
    fontSize: 15,
    color: white,
    padding: 8
  },
  typingText: {
    fontSize: 15,
    color: white
  }
});

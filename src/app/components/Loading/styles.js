import { StyleSheet } from 'react-native';
import { white } from '@constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  customLoader: {
    marginTop: 3,
    marginBottom: 10,
    height: 75
  }
});

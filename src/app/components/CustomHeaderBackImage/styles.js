import { StyleSheet } from 'react-native';
import { isIos } from '@constants/platform';

export default StyleSheet.create({
  icon: isIos
    ? {
        height: 21,
        width: 18,
        marginLeft: 9,
        marginRight: 6
      }
    : {
        height: 21,
        width: 24,
        margin: 3
      }
});

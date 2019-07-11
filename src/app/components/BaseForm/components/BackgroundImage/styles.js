import { StyleSheet } from 'react-native';
import { scale } from '@utils/scalingUtils';

const IMAGE_HEIGHT = scale(250);

export default StyleSheet.create({
  backgroundImage: {
    width: '100%',
    position: 'absolute',
    height: IMAGE_HEIGHT
  }
});

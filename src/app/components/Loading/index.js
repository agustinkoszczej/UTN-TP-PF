import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '@lottieAssets/loading.json';

import styles from './styles';

function Loading() {
  return (
    <View style={styles.container}>
      <LottieView autoPlay source={loading} style={styles.icon} />
    </View>
  );
}

export default Loading;

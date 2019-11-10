import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '@lottieAssets/loading.json';

import styles from './styles';

function Loading() {
  return (
    <View style={styles.container}>
      <LottieView source={loading} loop autoPlay style={{ width: 250, height: 250 }} />
    </View>
  );
}

export default Loading;

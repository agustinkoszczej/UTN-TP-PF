import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { black } from '@constants/colors';

import styles from './styles';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={black} />
    </View>
  );
}

export default Loading;

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { oceanGreen } from '@constants/colors';

import styles from './styles';

function InitialLoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={oceanGreen} size="large" style={styles.loader} />
    </View>
  );
}

export default InitialLoadingScreen;

import React from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { AirbnbRating } from 'react-native-ratings';
import iconAsset from '@lottieAssets/profile.json';
import { black } from '@constants/colors';

import styles from './styles';

function Profile() {
  return (
    <View style={styles.container}>
      <LottieView autoPlay loop={false} source={iconAsset} style={styles.icon} />
      <Text>Juan perez</Text>
      <AirbnbRating selectedColor={black} defaultRating={2.25} isDisabled style={{ paddingVertical: 10 }} />
    </View>
  );
}

export default Profile;

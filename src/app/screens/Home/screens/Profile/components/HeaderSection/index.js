import React from 'react';
import LottieView from 'lottie-react-native';
import { AirbnbRating } from 'react-native-ratings';
import iconAsset from '@lottieAssets/profile.json';
import { black } from '@constants/colors';
import CustomText from '@components/CustomText';
import CustomButton from '@components/CustomButton';

import { strings } from './constants';
import styles from './styles';

function HeaderSectionContainer() {
  return (
    <>
      <LottieView autoPlay loop={false} source={iconAsset} style={styles.icon} />
      <CustomButton title={strings.edit} />
      <CustomText>Juan perez</CustomText>
      <AirbnbRating selectedColor={black} defaultRating={2.25} isDisabled style={{ paddingVertical: 10 }} />
    </>
  );
}

export default HeaderSectionContainer;

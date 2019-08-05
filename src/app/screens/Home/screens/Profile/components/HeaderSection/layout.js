import React from 'react';
import PropTypes from 'prop-types';
import { AirbnbRating } from 'react-native-ratings';
import { View, Image } from 'react-native';
import { black } from '@constants/colors';
import CustomText from '@components/CustomText';
import Loadable from '@components/Loadable';
import CustomButton from '@components/CustomButton';

import { strings } from './constants';
import styles from './styles';

function HeaderSection({ fullName, email, handleLogOut, navigateToConfiguration, picture }) {
  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Image source={{ uri: picture }} style={styles.icon} />
        <View style={styles.nameSection}>
          <CustomText bold style={styles.name}>
            {fullName}
          </CustomText>
          <CustomText style={styles.direction}>{email}</CustomText>
        </View>
      </View>
      <AirbnbRating selectedColor={black} defaultRating={2.25} isDisabled />
      <CustomButton
        secondaryBtn
        title={strings.edit}
        style={styles.button}
        onPress={navigateToConfiguration}
      />
      <CustomButton title={strings.closeSession} style={styles.button} onPress={handleLogOut} />
    </View>
  );
}

HeaderSection.propTypes = {
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  navigateToConfiguration: PropTypes.func.isRequired
};

export default Loadable(props => props.loading)(HeaderSection);

import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground } from 'react-native';
import CustomText from '@components/CustomText';
import Loadable from '@components/Loadable';
import CustomButton from '@components/CustomButton';

import background from '../../assets/background.jpg';

import { strings } from './constants';
import styles from './styles';

function HeaderSection({ fullName, email, handleLogOut, navigateToConfiguration, picture }) {
  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.userSection}>
        <Image source={{ uri: picture }} style={styles.icon} />
        <View style={styles.nameSection}>
          <CustomText bold style={styles.name} ellipsisMode="tail">
            {fullName}
          </CustomText>
          <CustomText style={styles.email} ellipsisMode="tail">
            {email}
          </CustomText>
        </View>
      </View>
      <CustomButton
        secondaryBtn
        title={strings.edit}
        style={styles.button}
        onPress={navigateToConfiguration}
      />
      <CustomButton
        title={strings.closeSession}
        style={styles.button}
        onPress={handleLogOut}
        textStyle={styles.white}
      />
    </ImageBackground>
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

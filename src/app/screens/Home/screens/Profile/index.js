import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import HeaderSection from './components/HeaderSection';
import InfoSection from './components/InfoSection';

function Profile() {
  return (
    <View style={styles.container}>
      <HeaderSection />
      <InfoSection />
    </View>
  );
}

export default Profile;

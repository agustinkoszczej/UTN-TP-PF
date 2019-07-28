import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import HeaderSection from './components/HeaderSection';

function Profile() {
  return (
    <View style={styles.container}>
      <HeaderSection />
    </View>
  );
}

export default Profile;

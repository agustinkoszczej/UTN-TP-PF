import React from 'react';
import { ScrollView } from 'react-native';

import styles from './styles';
import HeaderSection from './components/HeaderSection';
import InfoSection from './components/InfoSection';

function Profile() {
  return (
    <ScrollView style={styles.container}>
      <HeaderSection />
      <InfoSection />
    </ScrollView>
  );
}

export default Profile;

import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import CustomText from '@components/CustomText';
import phoneIcon from '@assets/ic_phone.png';
import aptIcon from '@assets/ic_apt.png';
import noteIcon from '@assets/ic_note.png';

import styles from './styles';

function CompanySection({ cuit, companyName, contactNumber }) {
  return (
    <View>
      <Card style={styles.card}>
        <Image source={aptIcon} style={styles.icon} />
        <CustomText style={styles.placeholder}>Nombre:</CustomText>
        <CustomText>{companyName}</CustomText>
      </Card>
      <Card style={styles.card}>
        <Image source={noteIcon} style={styles.icon} />
        <CustomText style={styles.placeholder}>CUIT:</CustomText>
        <CustomText>{cuit}</CustomText>
      </Card>
      <Card style={styles.card}>
        <Image source={phoneIcon} style={styles.icon} />
        <CustomText style={styles.placeholder}>Teléfono:</CustomText>
        <CustomText>{contactNumber}</CustomText>
      </Card>
    </View>
  );
}

CompanySection.propTypes = {
  cuit: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired
};

export default CompanySection;

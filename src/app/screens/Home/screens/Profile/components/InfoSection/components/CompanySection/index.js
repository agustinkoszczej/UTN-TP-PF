import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Card from '@components/Card';
import { connect } from 'react-redux';
import { userModel } from '@propTypes/userModel';
import CustomText from '@components/CustomText';
import phoneIcon from '@assets/ic_phone.png';
import aptIcon from '@assets/ic_apt.png';
import noteIcon from '@assets/ic_note.png';

import styles from './styles';

function CompanySection({ currentUser }) {
  const { cuit, companyName, contactNumber } = currentUser;
  return (
    <View>
      <Card style={styles.card}>
        <Image source={aptIcon} style={styles.icon} />
        <CustomText style={styles.placeholder}>Nombre:</CustomText>
        <CustomText
          textProps={{ numberOfLines: 1 }}
          style={{ marginLeft: 5, overflow: 'hidden', width: 125 }}
        >
          {companyName}
        </CustomText>
      </Card>
      <Card style={styles.card}>
        <Image source={noteIcon} style={styles.icon} />
        <CustomText style={styles.placeholder}>CUIT:</CustomText>
        <CustomText style={{ marginLeft: 25 }}>{cuit}</CustomText>
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
  cuit: PropTypes.string,
  companyName: PropTypes.string,
  currentUser: PropTypes.shape(userModel),
  contactNumber: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  currentUser: ownProps.supplier ? state.auth.currentSupplier : state.auth.currentUser
});

export default connect(mapStateToProps)(CompanySection);

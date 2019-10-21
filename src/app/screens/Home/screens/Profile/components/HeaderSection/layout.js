import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import CustomText from '@components/CustomText';
import Loadable from '@components/Loadable';
import CustomButton from '@components/CustomButton';

import background from '../../assets/background.jpg';

import { strings } from './constants';
import styles from './styles';

function HeaderSection({
  fullName,
  email,
  handleLogOut,
  navigateToConfiguration,
  picture,
  rating,
  isSupplier,
  requestSend,
  inAgenda,
  navigateToChat,
  declineLoading,
  acceptLoading,
  handleAccept,
  handleDecline,
  isRequesting
}) {
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
      <AirbnbRating defaultRating={rating} isDisabled showRating={false} />
      {requestSend ? (
        <View style={{ flexDirection: 'row' }}>
          <CustomButton
            secondaryBtn
            title="Aceptar"
            style={[styles.requestButton, { marginBottom: 10, marginRight: 10 }]}
            onPress={handleAccept}
            loading={acceptLoading}
          />
          <CustomButton
            secondaryBtn
            title="Declinar"
            style={[styles.requestButton, { marginBottom: 10 }]}
            onPress={handleDecline}
            loading={declineLoading}
          />
        </View>
      ) : (
        <CustomButton
          secondaryBtn
          title={
            !isSupplier
              ? strings.edit
              : inAgenda
              ? strings.remove
              : isRequesting
              ? strings.cancelRequest
              : strings.requestContact
          }
          style={[styles.button, isSupplier && { marginBottom: 10 }]}
          onPress={navigateToConfiguration}
        />
      )}

      {!isSupplier ? (
        <CustomButton
          title={strings.closeSession}
          style={styles.button}
          onPress={handleLogOut}
          textStyle={styles.white}
        />
      ) : (
        inAgenda && (
          <CustomButton
            secondaryBtn
            title="Mensaje"
            style={[styles.button, { marginBottom: 10 }]}
            onPress={navigateToChat}
          />
        )
      )}
    </ImageBackground>
  );
}

HeaderSection.propTypes = {
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  navigateToChat: PropTypes.func.isRequired,
  navigateToConfiguration: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  isSupplier: PropTypes.bool.isRequired,
  requestSend: PropTypes.bool.isRequired,
  inAgenda: PropTypes.bool.isRequired,
  handleAccept: PropTypes.func.isRequired,
  handleDecline: PropTypes.func.isRequired,
  acceptLoading: PropTypes.bool.isRequired,
  declineLoading: PropTypes.bool.isRequired,
  isRequesting: PropTypes.bool.isRequired
};

export default Loadable(props => props.loading)(HeaderSection);

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
  isRequesting,
  handleDelete,
  handleAdd,
  contactLoading
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
            onPress={handleDelete}
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
          onPress={
            !isSupplier
              ? navigateToConfiguration
              : inAgenda
              ? handleDelete
              : isRequesting
              ? handleDelete
              : handleAdd
          }
          loading={contactLoading}
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
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  rating: PropTypes.number,
  isSupplier: PropTypes.bool,
  requestSend: PropTypes.bool,
  inAgenda: PropTypes.bool,
  handleAccept: PropTypes.func.isRequired,
  acceptLoading: PropTypes.bool.isRequired,
  declineLoading: PropTypes.bool.isRequired,
  isRequesting: PropTypes.bool,
  contactLoading: PropTypes.bool
};

export default Loadable(props => props.loading)(HeaderSection);

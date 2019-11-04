import React, { Component } from "react";
import { Text, View } from 'react-native';

import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";

import PropTypes from 'prop-types';
import { navigationModel } from '@propTypes/navigationModel';
import { QR_FIELDS, SCREEN_SIZE } from './constants';
import { styles, iconScanColor } from './styles';


class ScannerQR extends Component {
  onSuccess(scannerInfo) {
    const { navigation } = this.props;
    const onSubmit = navigation.getParam('handleSubmit');
    const setFieldValue = navigation.getParam('setFieldValue');
    setFieldValue(QR_FIELDS.QR, scannerInfo.data);
    onSubmit();
    navigation.goBack();
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_SIZE.width * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  render() {
    return (
      <QRCodeScanner
        showMarker
        onRead={this.onSuccess.bind(this)}
        cameraStyle={{ height: SCREEN_SIZE.height }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: "white", textAlign: 'center' }}>
                Escaneá el QR de tu negocio
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <Icon
                  name="ios-qr-scanner"
                  size={SCREEN_SIZE.width * 0.73}
                  color={iconScanColor}
                />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={this.makeSlideOutTranslation(
                    "translateY",
                    SCREEN_SIZE.width * -0.54
                  )}
                />
              </View>
              <View style={styles.leftAndRightOverlay} />
            </View>
            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    );
  }
}

ScannerQR.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired
};

export default ScannerQR;
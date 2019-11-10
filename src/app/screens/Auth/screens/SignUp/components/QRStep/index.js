import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import CustomButton from '@components/CustomButton';
import Routes from '@constants/routes';
import { safeCameraRequest } from '@utils/cameraPermission';
import LottieView from 'lottie-react-native';
import qrScan from '@assets/qr-scan.png';
import greenCheck from '@lottieAssets/green-check.json';

import styles from './styles';

class QRStep extends Component {
  navigateToCamera = () => {
    const { navigation, handleSubmit, setFieldValue } = this.props;
    navigation.navigate(Routes.ScannerQR, { handleSubmit, setFieldValue });
  };

  handleScanQrCode = () => {
    safeCameraRequest(this.navigateToCamera);
  };

  render() {
    const { qrUrl } = this.props;

    return (
      <TouchableOpacity onPress={this.handleScanQrCode} style={styles.container}>
        {qrUrl ? (
          <LottieView source={greenCheck} autoPlay loop={false} style={{ width: 200, height: 200 }} />
        ) : (
          <Image source={qrScan} style={styles.qrImage} />
        )}
        <CustomButton primaryBtn textStyle={styles.white} style={styles.button} title="Escanear" />
      </TouchableOpacity>
    );
  }
}

const enhancer = compose(withNavigation);

QRStep.propTypes = {
  qrUrl: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default enhancer(QRStep);

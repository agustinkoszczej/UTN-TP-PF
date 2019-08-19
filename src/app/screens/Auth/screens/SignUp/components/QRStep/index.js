import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import CustomButton from '@components/CustomButton';
import Routes from '@constants/routes';
import { safeCameraRequest } from '@utils/cameraPermission';

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
    return (
      <View style={styles.container}>
        <CustomButton title="Escanear" onPress={this.handleScanQrCode} />
      </View>
    );
  }
}

const enhancer = compose(withNavigation);

QRStep.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default enhancer(QRStep);

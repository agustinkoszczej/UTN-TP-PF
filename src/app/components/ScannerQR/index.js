import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, AppState } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { navigationModel } from '@propTypes/navigationModel';

import { QR_FIELDS } from './constants';
import styles from './styles';

class ScannerQR extends Component {
  state = {
    appState: AppState.currentState,
    barcodeReaderEnabled: true
  };

  camRef = React.createRef();

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    this.disableBarcodeScanner();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  disableBarcodeScanner = () => this.setState({ barcodeReaderEnabled: false });

  enableBarcodeScanner = () => this.setState({ barcodeReaderEnabled: true });

  handleAppStateChange = nextAppState => {
    const { appState } = this.state;
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.camRef.current.resumePreview();
      this.enableBarcodeScanner();
    } else {
      this.camRef.current.pausePreview();
      this.disableBarcodeScanner();
    }
    this.setState({ appState: nextAppState });
  };

  onBarCodeRead = scannerInfo => {
    const { navigation } = this.props;
    const onSubmit = navigation.getParam('handleSubmit');
    const setFieldValue = navigation.getParam('setFieldValue');
    setFieldValue(QR_FIELDS.QR, scannerInfo.data);
    onSubmit();
    navigation.goBack();
  };

  render() {
    const { barcodeReaderEnabled } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          style={styles.preview}
          onBarCodeRead={barcodeReaderEnabled && this.onBarCodeRead}
          ref={this.camRef}
        />
      </View>
    );
  }
}

ScannerQR.propTypes = {
  navigation: PropTypes.shape(navigationModel).isRequired
};

export default ScannerQR;

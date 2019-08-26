import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import CustomDialog from '@components/CustomDialog';
import CustomText from '@components/CustomText';

import styles from './styles';

class RateDialog extends Component {
  handleAccept = () => {
    const {
      onCloseDialog,
      dialogContent: { onAcceptDialog }
    } = this.props;
    if (onAcceptDialog) {
      onAcceptDialog();
    }
    onCloseDialog();
  };

  render() {
    const { isVisible } = this.props;
    return (
      <CustomDialog
        singleAction
        visible={isVisible}
        acceptTitle="Valorar"
        onAcceptDialog={this.handleAccept}
        style={styles.container}
      >
        <View style={styles.content}>
          <CustomText title center style={styles.title}>
            Valorá el servicio del distribuidor
          </CustomText>

        </View>
      </CustomDialog>
    );
  }
}

RateDialog.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  dialogContent: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    acceptText: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        uri: PropTypes.string.isRequired
      })
    ]),
    onAcceptDialog: PropTypes.func
  }).isRequired,
  onCloseDialog: PropTypes.func.isRequired
};
export default RateDialog;

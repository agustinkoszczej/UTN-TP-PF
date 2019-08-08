import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import CustomDialog from '@components/CustomDialog';
import CustomText from '@components/CustomText';

import styles from './styles';

class SimpleDialog extends Component {
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
    const {
      dialogContent: { acceptText, image, title, message },
      isVisible
    } = this.props;
    return (
      <CustomDialog
        singleAction
        visible={isVisible}
        acceptTitle={acceptText}
        onAcceptDialog={this.handleAccept}
        style={styles.container}
      >
        <View style={styles.content}>
          {!!image && <Image source={image} style={styles.image} resizeMode="contain" />}
          <CustomText title center style={styles.title}>
            {title}
          </CustomText>
          <CustomText primary center>
            {message}
          </CustomText>
        </View>
      </CustomDialog>
    );
  }
}

SimpleDialog.propTypes = {
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
export default SimpleDialog;

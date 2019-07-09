import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, Modal } from 'react-native';

import styles from './styles';

function CustomModal({ children, onRequestClose, closeOnOverlayPress, ...modalProps }) {
  // TODO: Check a way to dont have an empy view.
  return (
    <Modal
      transparent
      animationType="fade"
      {...modalProps}
      onRequestClose={closeOnOverlayPress && onRequestClose}
    >
      <TouchableWithoutFeedback onPress={closeOnOverlayPress && onRequestClose}>
        <View style={styles.overlay}>
          {children}
          <View />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeOnOverlayPress: PropTypes.bool,
  onRequestClose: PropTypes.func
};

export default CustomModal;

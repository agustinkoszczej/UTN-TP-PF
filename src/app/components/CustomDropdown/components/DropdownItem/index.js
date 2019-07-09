import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import CustomText from '@components/CustomText';

import styles from './styles';

class DropdownItem extends Component {
  handleOnPress = () => {
    const { item, onPress } = this.props;
    onPress(item);
  };

  render() {
    const { item, itemNameSelector } = this.props;
    return (
      <TouchableOpacity onPress={this.handleOnPress} style={styles.container}>
        <CustomText>{itemNameSelector(item)}</CustomText>
      </TouchableOpacity>
    );
  }
}

DropdownItem.propTypes = {
  item: PropTypes.shape().isRequired,
  itemNameSelector: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired
};

export default DropdownItem;

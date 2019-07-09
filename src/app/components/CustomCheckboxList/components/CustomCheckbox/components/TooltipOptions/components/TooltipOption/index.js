import PropTypes from 'prop-types';
import React, { Component } from 'react';

import styles from '../../styles';
import Checkbox from '../../../Checkbox/index';

class TooltipOption extends Component {
  handlePress = () => {
    const { isSelected, double, onPress, option } = this.props;
    if (!(isSelected && !double)) onPress(option.side);
  };

  render() {
    const { option, isSelected, disabled } = this.props;
    return (
      <Checkbox
        style={styles.checkbox}
        onPress={this.handlePress}
        selected={isSelected}
        disabled={disabled}
        title={option.title}
      />
    );
  }
}

TooltipOption.propTypes = {
  option: PropTypes.shape({ title: PropTypes.string.isRequired, side: PropTypes.string }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  double: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired
};

export default TooltipOption;

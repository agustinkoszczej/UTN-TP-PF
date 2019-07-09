import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Image } from 'react-native';

import { getDisabledTooltipOptions } from '../../utils';
import icImage from '../../assets/ic_image.png';

import TooltipOption from './components/TooltipOption';
import { OPTIONS, DOUBLE_OPTION } from './constants';
import styles from './styles';

class TooltipOptions extends Component {
  state = { disabledOptions: [] };

  static getDerivedStateFromProps(props, state) {
    const { enabledSide } = props;
    const { disabledOptions } = state;
    return enabledSide
      ? getDisabledTooltipOptions(enabledSide) === disabledOptions
        ? null
        : { disabledOptions: getDisabledTooltipOptions(enabledSide) }
      : null;
  }

  renderTooltipOption = option => {
    const { selected, onPressTooltipOption } = this.props;
    const { disabledOptions } = this.state;
    const isSelected = selected === option?.side;
    const disabled = disabledOptions.includes(option?.side);
    return (
      <TooltipOption
        key={option.title}
        option={option}
        isSelected={isSelected && !disabled}
        disabled={disabled}
        onPress={onPressTooltipOption}
      />
    );
  };

  render() {
    const { icon, isDouble, onPressDoubleOption } = this.props;
    return (
      <View style={styles.container}>
        {!!icon && <Image source={icon} defaultSource={icImage} resizeMode="contain" style={styles.icon} />}
        {OPTIONS.map(this.renderTooltipOption)}
        <View style={styles.separator} />
        <TooltipOption double option={DOUBLE_OPTION} isSelected={isDouble} onPress={onPressDoubleOption} />
      </View>
    );
  }
}

TooltipOptions.propTypes = {
  icon: PropTypes.number,
  onPressTooltipOption: PropTypes.func.isRequired,
  onPressDoubleOption: PropTypes.func.isRequired,
  selected: PropTypes.string,
  isDouble: PropTypes.bool.isRequired
};

export default TooltipOptions;

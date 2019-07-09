import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ViewPropTypes, Text } from 'react-native';
import { itemsModel } from '@propTypes/pizzaModel';
import { sides } from '@constants/ingredients';

import CustomCheckbox from './layout';
import { assignDefaultValue, getCheckboxSideIcon, ingredientImageTypes } from './utils';

class CustomCheckboxContainer extends Component {
  state = {
    isToolTipVisible: false,
    tooltipOptionSelected: sides.ALL,
    isDouble: false,
    ingredientIcon: null
  };

  static getDerivedStateFromProps(props, state) {
    const {
      item: { side, quantity, pictures, icon }
    } = props;
    const { tooltipOptionSelected, isDouble } = state;
    let newState = {};
    if (side !== tooltipOptionSelected) {
      newState = { tooltipOptionSelected: side };
    }
    if (quantity !== (isDouble ? 2 : 1)) {
      newState = { ...newState, isDouble: !isDouble };
    }
    if (state.ingredientIcon === null && (icon || pictures?.length)) {
      const uri = pictures?.find(i => i.category === ingredientImageTypes.ICON)?.url;
      newState = {
        ...newState,
        ingredientIcon: icon || (uri && { uri })
      };
    }
    return Object.keys(newState).length ? newState : null;
  }

  handleLongPressCheckbox = () => {
    const { enabledTooltip, onPressCheckbox, item, selected, enabledTooltipSide } = this.props;
    const { isToolTipVisible } = this.state;
    if (enabledTooltip && !isToolTipVisible) {
      this.toggleTooltip();
      if (!selected) {
        this.setState(assignDefaultValue(enabledTooltipSide, item, onPressCheckbox));
      }
    }
  };

  handlePressCheckbox = () => {
    const { onPressCheckbox, item, enabledTooltipSide } = this.props;
    const { isToolTipVisible } = this.state;
    if (!isToolTipVisible) {
      this.setState(assignDefaultValue(enabledTooltipSide, item, onPressCheckbox));
    }
  };

  handlePressDouble = () => {
    const { onPressTooltipOption, item } = this.props;
    this.setState(prevState => {
      onPressTooltipOption({ ...item, quantity: !prevState.isDouble ? 2 : 1 });
      return { isDouble: !prevState.isDouble };
    });
  };

  handlePressOption = side => {
    const { onPressTooltipOption, item } = this.props;
    this.setState(() => {
      onPressTooltipOption({ ...item, side });
      return { tooltipOptionSelected: side };
    });
  };

  toggleTooltip = () => this.setState(prevState => ({ isToolTipVisible: !prevState.isToolTipVisible }));

  render() {
    const {
      selected,
      item: { name },
      disabled,
      paused,
      enabledTooltip,
      enabledTooltipSide,
      style,
      checkboxStyle,
      checkboxTextProps
    } = this.props;
    const { isToolTipVisible, tooltipOptionSelected, isDouble, ingredientIcon } = this.state;
    const checkboxOptionIcon = enabledTooltip && getCheckboxSideIcon(tooltipOptionSelected, isDouble);
    return (
      <CustomCheckbox
        isToolTipVisible={isToolTipVisible}
        tooltipOptionSelected={tooltipOptionSelected}
        enabledTooltipSide={enabledTooltipSide}
        isDouble={isDouble}
        disabled={disabled}
        paused={paused}
        selected={selected}
        name={name}
        ingredientIcon={ingredientIcon}
        checkboxOptionIcon={checkboxOptionIcon}
        onPressCheckbox={this.handlePressCheckbox}
        onLongPressCheckbox={this.handleLongPressCheckbox}
        onPressTooltipOption={this.handlePressOption}
        onPressDoubleOption={this.handlePressDouble}
        onCloseTooltip={this.toggleTooltip}
        style={style}
        checkboxStyle={checkboxStyle}
        checkboxTextProps={checkboxTextProps}
      />
    );
  }
}

CustomCheckboxContainer.defaultProps = {
  enabledTooltip: false
};

CustomCheckboxContainer.propTypes = {
  onPressCheckbox: PropTypes.func.isRequired,
  onPressTooltipOption: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  enabledTooltip: PropTypes.bool,
  item: PropTypes.shape(itemsModel).isRequired,
  disabled: PropTypes.bool.isRequired,
  enabledTooltipSide: PropTypes.string,
  checkboxStyle: ViewPropTypes.style,
  checkboxTextProps: PropTypes.shape({ ...Text.propTypes }),
  paused: PropTypes.bool
};

export default CustomCheckboxContainer;

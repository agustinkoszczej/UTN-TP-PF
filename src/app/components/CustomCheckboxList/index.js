import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, ViewPropTypes } from 'react-native';
import withForm from '@components/withForm';
import { sides } from '@constants/ingredients';
import { itemsModel } from '@propTypes/pizzaModel';

import CustomCheckboxList from './layout';
import {
  getSelectedItem,
  getSelectedItems,
  getSelectedItemsWithTooltip,
  getSingleOptionSelectedItems
} from './utils';

class CustomCheckboxListContainer extends Component {
  state = { selected: [] };

  static getDerivedStateFromProps(props, state) {
    if (props.selected && props.selected !== state.selected) {
      return { selected: props.selected };
    }
    return null;
  }

  componentDidMount() {
    const { defaultValue, enabledTooltipSide, selected } = this.props;
    if (defaultValue && !selected?.length) {
      const side = enabledTooltipSide || sides.ALL;
      this.handlePressCheckbox({ side, quantity: 1, ...defaultValue });
    }
  }

  handlePressCheckbox = item => {
    this.setState(({ selected }) => {
      let newSelected;
      const { multiOption, onChange, category, enabledTooltipSide } = this.props;
      const isSelected = !!getSelectedItem(selected, item, enabledTooltipSide);
      if (multiOption) {
        newSelected = isSelected ? getSelectedItems(selected, item, enabledTooltipSide) : [...selected, item];
        if (onChange) {
          onChange(newSelected, category, enabledTooltipSide);
        }
        return { selected: newSelected };
      }
      newSelected = getSingleOptionSelectedItems(enabledTooltipSide, isSelected, item, selected);
      if (onChange && selected !== newSelected) {
        onChange(newSelected, category);
      }
      return { selected: newSelected };
    });
  };

  handlePressTooltipOption = item => {
    this.setState(({ selected }) => {
      const { onChange, category, enabledTooltipSide } = this.props;
      const newSelected = getSelectedItemsWithTooltip(selected, item, enabledTooltipSide);
      if (onChange) onChange(newSelected, category, enabledTooltipSide);
      return { selected: newSelected };
    });
  };

  render() {
    const { ...props } = this.props;
    const { selected } = this.state;
    return (
      <CustomCheckboxList
        onPressCheckbox={this.handlePressCheckbox}
        onPressTooltipOption={this.handlePressTooltipOption}
        selected={selected}
        {...props}
      />
    );
  }
}

CustomCheckboxListContainer.defaultProps = {
  multiOption: false,
  invalid: false
};

CustomCheckboxListContainer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemsModel)).isRequired,
  selected: PropTypes.shape(itemsModel),
  defaultValue: PropTypes.shape(itemsModel),
  title: PropTypes.string,
  multiOption: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  enabledItems: PropTypes.arrayOf(PropTypes.string),
  category: PropTypes.string,
  enabledTooltip: PropTypes.bool,
  enabledTooltipSide: PropTypes.string,
  checkboxStyle: ViewPropTypes.style,
  checkboxContainerStyle: ViewPropTypes,
  itemListStyle: ViewPropTypes.style,
  checkboxTextProps: PropTypes.shape({ ...Text.propTypes })
};

export const FormField = withForm(CustomCheckboxListContainer);

export default CustomCheckboxListContainer;

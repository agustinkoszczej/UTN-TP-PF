import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, ViewPropTypes, Text } from 'react-native';
import CustomText from '@components/CustomText';
import SeparatorWithText from '@components/SeparatorWithText';
import { itemsModel } from '@propTypes/pizzaModel';

import CustomCheckbox from './components/CustomCheckbox';
import styles from './styles';
import { getSelectedItem, isItemDisabled } from './utils';

class CustomCheckboxList extends Component {
  renderItem = item => {
    const {
      onPressCheckbox,
      onPressTooltipOption,
      selected,
      enabledItems,
      enabledTooltip,
      enabledTooltipSide,
      checkboxStyle,
      checkboxContainerStyle,
      checkboxTextProps,
      paused
    } = this.props;
    const selectedItem = getSelectedItem(selected, item, enabledTooltipSide);
    const isDisabled = !!enabledItems && isItemDisabled(enabledItems, item);
    return (
      <CustomCheckbox
        key={item.id}
        onPressCheckbox={onPressCheckbox}
        onPressTooltipOption={onPressTooltipOption}
        selected={!!selectedItem && !isDisabled}
        item={selectedItem || item}
        disabled={isDisabled || !!selectedItem?.preselected}
        enabledTooltip={enabledTooltip}
        enabledTooltipSide={enabledTooltipSide}
        style={checkboxContainerStyle}
        checkboxStyle={checkboxStyle}
        checkboxTextProps={checkboxTextProps}
        paused={paused}
      />
    );
  };

  render() {
    const { items, title, invalid, error, itemListStyle } = this.props;
    return (
      <View style={styles.container}>
        {!!title && <SeparatorWithText small text={title} style={styles.separator} />}
        <View style={[styles.itemList, itemListStyle]}>{items.map(this.renderItem)}</View>
        {invalid && !!error && (
          <CustomText error style={styles.errorMessage}>
            {error}
          </CustomText>
        )}
      </View>
    );
  }
}

CustomCheckboxList.propTypes = {
  onPressCheckbox: PropTypes.func.isRequired,
  onPressTooltipOption: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.shape(itemsModel)).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(itemsModel)).isRequired,
  title: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  enabledTooltip: PropTypes.bool,
  error: PropTypes.string,
  enabledItems: PropTypes.arrayOf(PropTypes.string),
  enabledTooltipSide: PropTypes.string,
  paused: PropTypes.bool,
  checkboxStyle: ViewPropTypes.style,
  checkboxContainerStyle: ViewPropTypes.style,
  checkboxTextProps: PropTypes.shape({ ...Text.propTypes }),
  itemListStyle: ViewPropTypes.style
};

export default CustomCheckboxList;

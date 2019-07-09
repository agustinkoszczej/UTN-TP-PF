import PropTypes from 'prop-types';
import React from 'react';
import { View, ViewPropTypes, Text } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { moreTranslucentBlack } from '@constants/colors';

import Checkbox from './components/Checkbox';
import TooltipOptions from './components/TooltipOptions';
import styles from './styles';

function CustomCheckbox({
  isToolTipVisible,
  tooltipOptionSelected,
  enabledTooltipSide,
  isDouble,
  disabled,
  selected,
  name,
  ingredientIcon,
  checkboxOptionIcon,
  onPressCheckbox,
  onLongPressCheckbox,
  onPressTooltipOption,
  onPressDoubleOption,
  onCloseTooltip,
  paused,
  style,
  checkboxStyle,
  checkboxTextProps
}) {
  return (
    <View style={[styles.container, style]}>
      <Tooltip
        animated
        backgroundColor={moreTranslucentBlack}
        isVisible={isToolTipVisible}
        tooltipStyle={styles.tooltip}
        contentStyle={styles.content}
        arrowSize={styles.arrowSize}
        content={
          <TooltipOptions
            selected={tooltipOptionSelected}
            enabledSide={enabledTooltipSide}
            isDouble={isDouble}
            icon={ingredientIcon}
            onPressTooltipOption={onPressTooltipOption}
            onPressDoubleOption={onPressDoubleOption}
          />
        }
        placement="top"
        onClose={onCloseTooltip}
      >
        <Checkbox
          disabled={disabled}
          onPress={onPressCheckbox}
          onLongPress={onLongPressCheckbox}
          selected={selected}
          title={name}
          icon={ingredientIcon}
          optionIcon={checkboxOptionIcon}
          style={checkboxStyle}
          textProps={checkboxTextProps}
          paused={paused}
        />
      </Tooltip>
    </View>
  );
}

CustomCheckbox.propTypes = {
  isToolTipVisible: PropTypes.bool.isRequired,
  isDouble: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  onPressCheckbox: PropTypes.func.isRequired,
  onLongPressCheckbox: PropTypes.func.isRequired,
  onPressTooltipOption: PropTypes.func.isRequired,
  onPressDoubleOption: PropTypes.func.isRequired,
  onCloseTooltip: PropTypes.func.isRequired,
  ingredientIcon: PropTypes.number,
  checkboxOptionIcon: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  name: PropTypes.string.isRequired,
  tooltipOptionSelected: PropTypes.string,
  enabledTooltipSide: PropTypes.string,
  checkboxStyle: ViewPropTypes.style,
  checkboxTextProps: PropTypes.shape({ ...Text.propTypes }),
  paused: PropTypes.bool
};

export default CustomCheckbox;

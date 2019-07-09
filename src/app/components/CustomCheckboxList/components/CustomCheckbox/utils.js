import { sides } from '@constants/ingredients';

import circleFullDouble from './assets/circle_full_x2.png';
import circleFull from './assets/circle_full.png';
import circleHalf1Double from './assets/circle_half_1_x2.png';
import circleHalf1 from './assets/circle_half_1.png';
import circleHalf2Double from './assets/circle_half_2_x2.png';
import circleHalf2 from './assets/circle_half_2.png';

export const ingredientImageTypes = {
  ICON: 'icon',
  PHOTO: 'photo'
};

const sideMapper = {
  [sides.ALL]: {
    normal: circleFull,
    double: circleFullDouble,
    disabledOptions: [sides.LEFT, sides.RIGHT]
  },
  [sides.LEFT]: {
    normal: circleHalf1,
    double: circleHalf1Double,
    disabledOptions: [sides.ALL, sides.RIGHT]
  },
  [sides.RIGHT]: {
    normal: circleHalf2,
    double: circleHalf2Double,
    disabledOptions: [sides.LEFT, sides.ALL]
  }
};

export const getCheckboxSideIcon = (side, isDouble = false) => {
  const icon = sideMapper[side];
  return isDouble ? icon?.double : icon?.normal;
};

export const getDisabledTooltipOptions = side => sideMapper[side]?.disabledOptions;

export const assignDefaultValue = (enabledTooltipSide, item, onPressCheckbox) => {
  const side = enabledTooltipSide || sides.ALL;
  onPressCheckbox({ side, quantity: 1, ...item });
  return { tooltipOptionSelected: side, isDouble: false };
};

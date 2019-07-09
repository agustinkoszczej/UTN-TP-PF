import { sides } from '@constants/ingredients';

import { strings } from '../../i18n';

export const OPTIONS = [
  { title: strings.HALF(1), side: sides.LEFT },
  { title: strings.ALL(), side: sides.ALL },
  { title: strings.HALF(2), side: sides.RIGHT }
];

export const DOUBLE_OPTION = { title: 'x2' };

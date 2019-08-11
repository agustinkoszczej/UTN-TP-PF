import React from 'react';
import PropTypes from 'prop-types';
import CustomText from '@components/CustomText';

import { ORDER_STYLES, ORDER_STATUS_STRINGS } from './constants';
import styles from './styles';

function StatusTag({ status }) {
  return (
    <CustomText uppercase style={[styles.tag, ORDER_STYLES[status]]}>
      {ORDER_STATUS_STRINGS[status]}
    </CustomText>
  );
}

StatusTag.propTypes = {
  status: PropTypes.string.isRequired
};

export default StatusTag;

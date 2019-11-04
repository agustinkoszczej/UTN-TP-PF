import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import Collapsible from '@components/Collapsible';
import { isIos } from '@constants/platform';

function Calendar({ show, value, updateDate }) {
  const Container = useMemo(() => (isIos ? Collapsible : Fragment), []);
  return (
    (isIos || show) && (
      <Container {...(isIos && { collapsed: !show })}>
        <DateTimePicker
          value={value}
          mode="date"
          locale="es"
          onChange={updateDate}
          maximumDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)}
          minimumDate={new Date()}
        />
      </Container>
    )
  );
}

Calendar.propTypes = {
  show: PropTypes.bool.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  updateDate: PropTypes.func.isRequired
};

export default Calendar;

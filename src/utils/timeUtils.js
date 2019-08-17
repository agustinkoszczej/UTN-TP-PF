import moment from 'moment';

export const dateFormat = date => moment(date).format('DD/MM/YYYY');

export const getTimezoneOffset = () => new Date().getTimezoneOffset() / 60 + 1;

export const dateFormatForCalendar = date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), getTimezoneOffset()));

import numeral from 'numeral';

export const formatMoney = number => numeral(parseFloat(number)).format(`$ 0,0.00`);

export const formatNumber = number => number && numeral(parseFloat(number)).format('0,0.[00]');

export const formatFloat = number => number && numeral(parseFloat(number)).format('0,0.00');

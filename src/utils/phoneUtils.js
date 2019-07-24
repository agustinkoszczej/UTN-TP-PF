import { COUNTRY_CODE, PHONE_LENGTH } from '@constants/user';

const getFormattedPhone = phone =>
  !phone || !phone.includes(COUNTRY_CODE) ? `${COUNTRY_CODE}${phone?.replace('+', '')}` : phone;

export const handlePhoneFormatChange = (phone, onFormatChange) => {
  const formattedPhone = getFormattedPhone(phone);
  if (phone !== formattedPhone) onFormatChange('phone', formattedPhone.substring(0, PHONE_LENGTH));
};

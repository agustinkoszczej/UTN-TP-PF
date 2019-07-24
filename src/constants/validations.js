import { COUNTRY_CODE } from '@constants/user';

export const phoneRegex = /^(\+\d+)$/;
export const phoneStartsWithCodeRegex = new RegExp(`^(\\${COUNTRY_CODE})d?`);
export const emailRegex = /^(([^<>()·=~ºªÇ¨?¿*^|#¢∞¬÷“$%”≠´}{![\]\\.,;:\s@"]+(\.[^<>·$%&/=~ºªÇ¨?¿*^|#¢∞¬÷“”≠´}{!()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const nameRegex = /^([a-z A-Z ÑñáÁéÉíÍóÓúÚäëïöüÿÄËÏÖÜÇç]*)$/;
export const passwordRegex = new RegExp(
  '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-z\\d^$*.:;?"!|@#%&><_~\\\\/-\\{}()]*$'
);
export const cuitRegex = '\b(20|23|24|27|30|33|34)(D)?[0-9]{8}(D)?[0-9]';

import { buildTranslations, buildConstants } from '@utils/i18nUtils';

const namespace = 'customHeader';
const translations = {
  es: {
    delivery: 'Delivery a:',
    pickUp: 'Retiro en Local:'
  }
};

export const strings = buildConstants(translations, namespace, 'es');
export default buildTranslations(translations, namespace);

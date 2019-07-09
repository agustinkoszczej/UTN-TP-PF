import { buildTranslations, buildConstants } from '@utils/i18nUtils';

const namespace = 'tooltipOptions';
const translations = {
  es: {
    half: 'Mitad {{0}}',
    all: 'Toda'
  }
};

export const strings = buildConstants(translations, namespace, 'es');
export default buildTranslations(translations, namespace);

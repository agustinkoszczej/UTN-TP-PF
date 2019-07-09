import { buildTranslations, buildConstants } from '@utils/i18nUtils';

const namespace = 'customDialog';
const translations = {
  es: {
    confirmDefault: 'Sí',
    denyDefault: 'No'
  }
};

export const strings = buildConstants(translations, namespace, 'es');
export default buildTranslations(translations, namespace);

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';

import en from './en.json';
import be_la from './be_la.json';
import be_cy from './be_cy.json';
import pl from './pl.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: { translation: en },
  be_la: { translation: be_la },
  be_cy: { translation: be_cy },
  pl: { translation: pl },
};

i18n
  .use(initReactI18next)
  .use(intervalPlural) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'be_cy', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

interface Language {
  id: string;
  label: string;
}
export const languages: Language[] = [
  { id: 'en', label: 'English' },
  { id: 'be_la', label: 'Belarusian (Latin)' },
  { id: 'be_cy', label: 'Belarusian (Cyrillic)' },
  { id: 'pl', label: 'Polish' },
];

export default i18n;

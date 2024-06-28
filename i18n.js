// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './i18n/en.json';
import itTranslation from './i18n/it.json';

const resources = {
  en: {
    translation: enTranslation.translation
  },
  it: {
    translation: itTranslation.translation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // lingua di default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

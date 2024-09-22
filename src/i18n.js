import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import EN from './locales/en/translation.json';
import UA from './locales/ua/translation.json';

const resources = {
  en: { translation: EN },
  ua: { translation: UA },
};

const savedLang = localStorage.getItem('i18nextLng');
const userLang = navigator.language.slice(0, 2);
let lang = savedLang || (resources[userLang] ? userLang : 'en');

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  lng: lang,
  fallbackLng: 'en',
  debug: false,
});

export const formatDate = (date) => {
  return date.toLocaleDateString(lang === 'ua' ? 'uk-UA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default i18n;

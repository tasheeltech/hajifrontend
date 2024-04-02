// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./translations/en.json";
import arTranslation from "./translations/ar.json";
import urTranslation from "./translations/ur.json";
import hiTranslation from "./translations/hi.json";

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      ar: {
        translation: arTranslation,
      },
      ur: {
        translation: urTranslation,
      },
      hi: {
        translation: hiTranslation,
      },
    },
    fallbackLng: "ur",
  });

export default i18n;

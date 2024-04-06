// src/i18n.js
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import Backend from "i18next-http-backend"

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    // lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   // for all available options read the backend's repository readme file
    //   loadPath: "/locales/{{lng}}/{{ns}}.json",
    // },
  })

export default i18n

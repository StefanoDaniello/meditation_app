import * as Localization from "expo-localization";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Importa i tuoi file di traduzione
import en from "./locales/en.json";
import it from "./locales/it.json";

// Utilizza un'alternativa sicura nel caso in cui getLocales()[0] non sia definito
const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";

i18next.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: deviceLanguage, // Usa la lingua del dispositivo come default
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
    it: {
      translation: it,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  debug: true,
});

export default i18next;

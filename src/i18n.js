import i18n from "i18next"
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector"
import {reactI18nextModule} from "react-i18next";
import HttpApi from "i18next-http-backend"

import translationEN from "./locales/en/translation.json"
import translationTUR from "./locales/tur/translation.json"

const resources = {
    en: {
        translation: translationEN
    },
    tur: {
        translation: translationTUR
    }
}

i18n
    .use(reactI18nextModule)
    .use(I18nextBrowserLanguageDetector)
    .use(HttpApi)
    .init({
        resources,
        fallbackLng: "en",
        detection: {
            order: [ 'cookie', 'htmlTag', 'path'],
            caches: ['cookie'],
        },
        caches: ['cookie'],
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        react :{
            useSuspense: false
        }

    })


export default i18n;
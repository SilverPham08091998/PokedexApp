import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { EN, VI } from "./source";

const languageDetector: any = {
  type: "languageDetector",
  async: true,
  detect: (cb: (locale: string) => void) => cb("en"),
  init: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: EN,
      vi: VI,
    },
    compatibilityJSON: "v3",
  })
  .then();

export function translate(path: any) {
  return i18next.t(path);
}

export function changeLanguage(alias: any) {
  i18next.changeLanguage(alias).then();
}

export default i18next;

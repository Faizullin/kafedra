import EnglishTr from "./langs/en.json";
import RussianTr from "./langs/ru.json";

export type TLang = "en" | "ru";
const messages = {
  en: EnglishTr,
  ru: RussianTr,
};

export interface ILangOption {
  code: TLang;
  name: string;
}

export default class LangConfig {
  static getLang(): TLang {
    const dLang = localStorage.getItem("lang") || "en";
    return dLang as TLang;
  }
  static setLang(dLang: TLang): TLang | undefined {
    if (Object.keys(messages).includes(dLang)) {
      localStorage.setItem("lang", dLang);
      return dLang
    }
  }
  static getLangConfig() {
    const lang = this.getLang();
    return { lang, messages: messages[lang] };
  }
}

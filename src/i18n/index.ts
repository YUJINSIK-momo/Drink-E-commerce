import ja from "./ja"
import ko from "./ko"
import en from "./en"

export type Language = "ja" | "ko" | "en"
export type Translations = typeof ja

const translations: Record<Language, Translations> = { ja, ko, en }

export function getTranslations(lang: Language): Translations {
  return translations[lang]
}

export { ja, ko, en }

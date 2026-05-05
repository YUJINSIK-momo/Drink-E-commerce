import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import { getTranslations } from "../i18n"
import type { Language, Translations } from "../i18n"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("lang")
    return (saved as Language) || "ja"
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("lang", newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: getTranslations(lang) }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}

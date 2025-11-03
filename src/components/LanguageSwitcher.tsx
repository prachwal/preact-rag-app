import { memo } from "preact/compat"
import { useState, useEffect } from "preact/hooks"
import i18n from "../i18n"

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
] as const

export const LanguageSwitcher = memo(function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en')

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng)
    }
    i18n.on('languageChanged', handleLanguageChange)
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  const cycleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex(lang => lang.code === currentLang)
    const nextIndex = (currentIndex + 1) % LANGUAGES.length
    const nextLang = LANGUAGES[nextIndex]
    i18n.changeLanguage(nextLang.code)
  }

  const currentLangObj = LANGUAGES.find(lang => lang.code === currentLang) || LANGUAGES[0]

  return (
    <button
      onClick={cycleLanguage}
      class="language-switcher"
      aria-label={`Change language, current is ${currentLangObj.label}`}
      title={`Language: ${currentLangObj.label}`}
    >
      <span class="language-flag">{currentLangObj.flag}</span>
      <span class="language-label">{currentLangObj.label}</span>
    </button>
  )
})

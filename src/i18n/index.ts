import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import zh from '../locales/zh.json'
import de from '../locales/de.json'
import fr from '../locales/fr.json'

export type Locale = 'en' | 'zh' | 'de' | 'fr'

export const locales: { code: Locale; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' }
]

// Get initial locale from localStorage or default
const storedLocale = localStorage.getItem('locale') as Locale | null
const defaultLocale: Locale = storedLocale || 'en'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
    de,
    fr
  }
})

export const setLocale = (locale: Locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}

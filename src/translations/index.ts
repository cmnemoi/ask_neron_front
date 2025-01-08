import en from './en'
import fr from './fr'

export const translations = {
  en,
  fr,
}

export type TranslationKey = keyof typeof en

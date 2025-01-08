import type { TranslationPort } from '../../core/ports/TranslationPort'

type TranslationValue = string | { [key: string]: TranslationValue }

type NestedTranslations = {
  [locale: string]: TranslationValue
}

export class InMemoryTranslationAdapter implements TranslationPort {
  constructor(private translations: NestedTranslations) {}

  translate(key: string, locale: string): string {
    const keys = key.split('.')
    let result: unknown = this.translations[locale]

    for (const k of keys) {
      if (!result || typeof result !== 'object') break
      result = (result as Record<string, unknown>)[k]
    }

    return typeof result === 'string' ? result : key
  }
}

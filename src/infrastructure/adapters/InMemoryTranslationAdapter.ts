import type { TranslationPort } from '../../core/ports/TranslationPort'

type NestedTranslations = {
  [locale: string]: {
    [key: string]: string | { [key: string]: string | { [key: string]: string } }
  }
}

export class InMemoryTranslationAdapter implements TranslationPort {
  constructor(private translations: NestedTranslations) {}

  translate(key: string, locale: string): string {
    const keys = key.split('.')
    let result: any = this.translations[locale]

    for (const k of keys) {
      if (!result) break
      result = result[k]
    }

    return typeof result === 'string' ? result : key
  }
}

import type { TranslationPort } from '../ports/TranslationPort'

export class TranslationService {
  constructor(private translationAdapter: TranslationPort) {}

  translate(key: string, locale: string): string {
    return this.translationAdapter.translate(key, locale)
  }
}

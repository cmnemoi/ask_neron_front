import { beforeEach, describe, it, expect } from 'vitest'
import { TranslationService } from '../services/TranslationService'
import { InMemoryTranslationAdapter } from '../../infrastructure/adapters/InMemoryTranslationAdapter'

describe('TranslationService', () => {
  let translationService: TranslationService
  let defaultTranslations: Record<
    string,
    {
      header: {
        title: string
        disclaimer: string
      }
      chat: {
        send: string
        thinking: string
      }
    }
  >

  beforeEach(() => {
    defaultTranslations = {
      fr: {
        header: {
          title: 'Ask NERON',
          disclaimer: 'NERON est basé sur un',
        },
        chat: {
          send: 'Envoyer',
          thinking: 'NERON réfléchit...',
        },
      },
      en: {
        header: {
          title: 'Ask NERON',
          disclaimer: 'NERON is based on a',
        },
        chat: {
          send: 'Send',
          thinking: 'NERON is thinking...',
        },
      },
    }
    const translationAdapter = new InMemoryTranslationAdapter(defaultTranslations)
    translationService = new TranslationService(translationAdapter)
  })

  describe('when translating nested keys', () => {
    it('translates nested messages in French', () => {
      // When
      const translatedTitle = translationService.translate('header.title', 'fr')
      const translatedSend = translationService.translate('chat.send', 'fr')

      // Then
      expect(translatedTitle).toBe('Ask NERON')
      expect(translatedSend).toBe('Envoyer')
    })

    it('translates nested messages in English', () => {
      // When
      const translatedDisclaimer = translationService.translate('header.disclaimer', 'en')
      const translatedThinking = translationService.translate('chat.thinking', 'en')

      // Then
      expect(translatedDisclaimer).toBe('NERON is based on a')
      expect(translatedThinking).toBe('NERON is thinking...')
    })
  })

  describe('when handling missing translations', () => {
    it('returns the key when nested translation is missing', () => {
      // When
      const translated = translationService.translate('header.nonexistent', 'fr')

      // Then
      expect(translated).toBe('header.nonexistent')
    })

    it('returns the key when locale is missing', () => {
      // When
      const translated = translationService.translate('header.title', 'es')

      // Then
      expect(translated).toBe('header.title')
    })

    it('returns the key when translation path is invalid', () => {
      // When
      const translated = translationService.translate('invalid.path.key', 'fr')

      // Then
      expect(translated).toBe('invalid.path.key')
    })
  })
})

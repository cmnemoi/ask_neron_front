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
        wikipediaLink: string
        apiRepository: string
        frontendRepository: string
      }
      repositories: {
        api: string
        frontend: string
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
          wikipediaLink: 'https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage',
          apiRepository: 'Dépôt API',
          frontendRepository: 'Dépôt Frontend',
        },
        repositories: {
          api: 'API',
          frontend: 'Frontend',
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
          wikipediaLink: 'https://en.wikipedia.org/wiki/Large_language_model',
          apiRepository: 'API Repository',
          frontendRepository: 'Frontend Repository',
        },
        repositories: {
          api: 'API',
          frontend: 'Frontend',
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

  describe('when translating Wikipedia link', () => {
    it('returns French Wikipedia link when locale is fr', () => {
      // When
      const link = translationService.translate('header.wikipediaLink', 'fr')

      // Then
      expect(link).toBe('https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage')
    })

    it('returns English Wikipedia link when locale is en', () => {
      // When
      const link = translationService.translate('header.wikipediaLink', 'en')

      // Then
      expect(link).toBe('https://en.wikipedia.org/wiki/Large_language_model')
    })
  })

  describe('when translating repository links', () => {
    it('translates repository texts in French', () => {
      // When
      const apiRepo = translationService.translate('header.apiRepository', 'fr')
      const frontendRepo = translationService.translate('header.frontendRepository', 'fr')
      const api = translationService.translate('repositories.api', 'fr')
      const frontend = translationService.translate('repositories.frontend', 'fr')

      // Then
      expect(apiRepo).toBe('Dépôt API')
      expect(frontendRepo).toBe('Dépôt Frontend')
      expect(api).toBe('API')
      expect(frontend).toBe('Frontend')
    })

    it('translates repository texts in English', () => {
      // When
      const apiRepo = translationService.translate('header.apiRepository', 'en')
      const frontendRepo = translationService.translate('header.frontendRepository', 'en')
      const api = translationService.translate('repositories.api', 'en')
      const frontend = translationService.translate('repositories.frontend', 'en')

      // Then
      expect(apiRepo).toBe('API Repository')
      expect(frontendRepo).toBe('Frontend Repository')
      expect(api).toBe('API')
      expect(frontend).toBe('Frontend')
    })
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

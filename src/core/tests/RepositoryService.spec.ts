import { describe, it, expect } from 'vitest'
import { RepositoryService } from '../services/RepositoryService'
import type { RepositoryPort } from '../ports/RepositoryPort'
import { InMemoryRepositoryAdapter } from '../../infrastructure/adapters/InMemoryRepositoryAdapter'

describe('RepositoryService', () => {
  it('provides example questions in English and French', () => {
    // Given
    const repositoryPort: RepositoryPort = new InMemoryRepositoryAdapter()
    const repositoryService = new RepositoryService(repositoryPort)
    const expectedQuestions = {
      questions: {
        en: ['What do myco-alarms detect?', 'How do you treat an illness?', 'Can a Mush get sick?'],
        fr: [
          'Que détectent les myco-alarmes ?',
          'Comment traiter une maladie ?',
          'Un Mush peut-il tomber malade ?',
        ],
      },
    }

    // When
    const exampleQuestions = repositoryService.getExampleQuestions()

    // Then
    expect(exampleQuestions).toEqual(expectedQuestions)
  })

  it('provides GitHub repository URLs', () => {
    // Given
    const repositoryPort: RepositoryPort = new InMemoryRepositoryAdapter()
    const repositoryService = new RepositoryService(repositoryPort)
    const expectedApiUrl = 'https://github.com/cmnemoi/emush_rag'
    const expectedFrontendUrl = 'https://github.com/cmnemoi/ask_neron_front'

    // When
    const repositories = repositoryService.getRepositories()

    // Then
    expect(repositories).toEqual({
      api: expectedApiUrl,
      frontend: expectedFrontendUrl,
    })
  })
})

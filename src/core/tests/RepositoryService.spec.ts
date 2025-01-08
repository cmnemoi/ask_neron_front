import { describe, it, expect } from 'vitest'
import { RepositoryService } from '../services/RepositoryService'
import type { RepositoryPort } from '../ports/RepositoryPort'
import { InMemoryRepositoryAdapter } from '../../infrastructure/adapters/InMemoryRepositoryAdapter'

describe('RepositoryService', () => {
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

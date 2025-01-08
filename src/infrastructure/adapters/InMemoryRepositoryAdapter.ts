import type { RepositoryPort, Repositories } from '../../core/ports/RepositoryPort'

export class InMemoryRepositoryAdapter implements RepositoryPort {
  getRepositories(): Repositories {
    return {
      api: 'https://github.com/cmnemoi/emush_rag',
      frontend: 'https://github.com/cmnemoi/ask_neron_front',
    }
  }
}

import type { RepositoryPort, Repositories } from '../ports/RepositoryPort'

export class RepositoryService {
  constructor(private repositoryPort: RepositoryPort) {}

  getRepositories(): Repositories {
    return this.repositoryPort.getRepositories()
  }
}

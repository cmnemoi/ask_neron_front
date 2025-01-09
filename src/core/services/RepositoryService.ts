import type { RepositoryPort, Repositories, ExampleQuestions } from '../ports/RepositoryPort'

export class RepositoryService {
  constructor(private repositoryPort: RepositoryPort) {}

  getRepositories(): Repositories {
    return this.repositoryPort.getRepositories()
  }

  getExampleQuestions(): ExampleQuestions {
    return this.repositoryPort.getExampleQuestions()
  }
}

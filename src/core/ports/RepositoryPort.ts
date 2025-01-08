export interface Repositories {
  api: string
  frontend: string
}

export interface RepositoryPort {
  getRepositories(): Repositories
}

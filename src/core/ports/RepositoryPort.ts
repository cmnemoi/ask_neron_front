export interface Repositories {
  api: string
  frontend: string
}

export interface LocalizedExampleQuestions {
  [locale: string]: string[]
}

export interface ExampleQuestions {
  questions: LocalizedExampleQuestions
}

export interface RepositoryPort {
  getRepositories(): Repositories
  getExampleQuestions(): ExampleQuestions
}

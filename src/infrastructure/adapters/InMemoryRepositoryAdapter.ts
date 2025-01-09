import type {
  RepositoryPort,
  Repositories,
  ExampleQuestions,
} from '../../core/ports/RepositoryPort'

export class InMemoryRepositoryAdapter implements RepositoryPort {
  getRepositories(): Repositories {
    return {
      api: 'https://github.com/cmnemoi/emush_rag',
      frontend: 'https://github.com/cmnemoi/ask_neron_front',
    }
  }

  getExampleQuestions(): ExampleQuestions {
    return {
      questions: {
        en: ['What do myco-alarms detect?', 'How do you treat an illness?', 'Can a Mush get sick?'],
        fr: [
          'Que détectent les myco-alarmes ?',
          'Comment traiter une maladie ?',
          'Un Mush peut-il tomber malade ?',
        ],
      },
    }
  }
}

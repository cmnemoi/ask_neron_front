import type { ChatPort, Message } from '../../core/ports/ChatPort'

export class InMemoryChatAdapter implements ChatPort {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendMessage(question: string, _history: Message[]): Promise<Message> {
    return {
      type: 'assistant',
      text: `This is a test response to: ${question}`,
      documents: [
        {
          metadata: {
            title: 'Test Document',
            source: 'Test Source',
            link: 'https://example.com',
          },
          content: 'Test content',
        },
      ],
    }
  }
}

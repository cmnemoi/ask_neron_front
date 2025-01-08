import type { ChatPort, Message } from '../../core/ports/ChatPort'

export class InMemoryChatAdapter implements ChatPort {
  async sendMessage(question: string, history: Message[]): Promise<Message> {
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

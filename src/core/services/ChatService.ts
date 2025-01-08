import type { ChatPort, Message } from '../ports/ChatPort'

export class ChatService {
  private history: Message[] = []

  constructor(private chatPort: ChatPort) {}

  async sendMessage(question: string, history: Message[]): Promise<Message> {
    const userMessage: Message = {
      type: 'user',
      text: question,
    }
    this.history.push(userMessage)

    const response = await this.chatPort.sendMessage(question, history)
    this.history.push(response)

    return response
  }

  getHistory(): Message[] {
    return this.history
  }
}

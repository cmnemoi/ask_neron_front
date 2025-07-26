import type { ChatPort, Message } from '../../core/ports/ChatPort'
import axios from 'axios'
export class ApiChatAdapter implements ChatPort {
  constructor(private apiUrl: string = 'https://askneron.com/api/questions') {}

  async sendMessage(question: string, history: Message[]): Promise<Message> {
    try {
      const response = await axios.post(this.apiUrl, {
        question,
        chat_history: history.map((message) => {
          return {
            role: message.type,
            content: message.text,
          }
        }),
      })

      return {
        type: 'assistant',
        text: response.data.answer,
        documents: response.data.retrieved_documents,
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error && error.message.includes('Failed to fetch')
          ? "Impossible de contacter NERON. Assurez-vous que l'API est en cours d'exécution sur http://localhost:3000"
          : "Désolé, une erreur s'est produite. Veuillez réessayer plus tard."

      return {
        type: 'assistant',
        text: errorMessage,
      }
    }
  }
}

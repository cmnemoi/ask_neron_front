export interface Document {
  metadata: {
    title: string
    source: string
    link: string
  }
  content: string
}

export interface Message {
  type: 'user' | 'assistant'
  text: string
  documents?: Document[]
}

export interface ChatPort {
  sendMessage(question: string, history: Message[]): Promise<Message>
}

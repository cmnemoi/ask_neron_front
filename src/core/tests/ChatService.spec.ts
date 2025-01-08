import { describe, it, expect } from 'vitest'
import { ChatService } from '../services/ChatService'
import type { Message, ChatPort } from '../ports/ChatPort'
import { InMemoryChatAdapter } from '../../infrastructure/adapters/InMemoryChatAdapter'

describe('ChatService', () => {
  it('sends a message and receives a response', async () => {
    // Given
    const chatPort: ChatPort = new InMemoryChatAdapter()
    const chatService = new ChatService(chatPort)
    const question = 'What is NERON?'

    // When
    const response = await chatService.sendMessage(question, [])

    // Then
    expect(response).toBeDefined()
    expect(response.text).toBeDefined()
    expect(response.type).toBe('assistant')
  })

  it('keeps track of chat history', async () => {
    // Given
    const chatPort: ChatPort = new InMemoryChatAdapter()
    const chatService = new ChatService(chatPort)
    const question = 'What is NERON?'

    // When
    await chatService.sendMessage(question, [])
    const history = chatService.getHistory()

    // Then
    expect(history).toHaveLength(2) // user message + assistant response
    expect(history[0]).toEqual({
      type: 'user',
      text: question,
    })
    expect(history[1].type).toBe('assistant')
  })
})

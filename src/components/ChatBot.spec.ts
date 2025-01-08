import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatBot from './ChatBot.vue'
import { ChatService } from '../core/services/ChatService'
import { InMemoryChatAdapter } from '../infrastructure/adapters/InMemoryChatAdapter'

describe('ChatBot', () => {
  it('displays user message immediately before waiting for chat service response', async () => {
    // Given
    const wrapper = mount(ChatBot, {
      data() {
        return {
          chatService: new ChatService(new InMemoryChatAdapter(1000)),
        }
      },
    })
    const userInput = 'Hello'

    // When
    await wrapper.find('input').setValue(userInput)
    await wrapper.find('button').trigger('click')

    // Then
    const messages = wrapper.findAll('.message')
    expect(messages).toHaveLength(1)
    expect(messages[0].text()).toContain(userInput)
  })
})

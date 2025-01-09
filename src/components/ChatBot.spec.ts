import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatBot from './ChatBot.vue'
import { ChatService } from '../core/services/ChatService'
import { InMemoryChatAdapter } from '../infrastructure/adapters/InMemoryChatAdapter'

describe('ChatBot', () => {
  it('displays example questions in French by default', async () => {
    // Given
    const wrapper = mount(ChatBot)
    const expectedQuestions = [
      'Que détectent les myco-alarmes ?',
      'Comment traiter une maladie ?',
      'Un Mush peut-il tomber malade ?',
    ]

    // When
    const exampleQuestions = wrapper.findAll('.example-question')

    // Then
    expect(exampleQuestions).toHaveLength(3)
    expectedQuestions.forEach((question, index) => {
      expect(exampleQuestions[index].text()).toBe(question)
    })
  })

  it('switches example questions to English when language is changed', async () => {
    // Given
    const wrapper = mount(ChatBot)
    const expectedQuestions = [
      'What do myco-alarms detect?',
      'How do you treat an illness?',
      'Can a Mush get sick?',
    ]

    // When
    const langSelector = wrapper.find('img[alt="Switch to en"]')
    await langSelector.trigger('click')
    await wrapper.vm.$nextTick()

    // Then
    const exampleQuestions = wrapper.findAll('.example-question')
    expect(exampleQuestions).toHaveLength(3)
    expectedQuestions.forEach((question, index) => {
      expect(exampleQuestions[index].text()).toBe(question)
    })
  })

  it('sends selected example question as message', async () => {
    // Given
    const wrapper = mount(ChatBot)
    const expectedQuestion = 'Que détectent les myco-alarmes ?'

    // When
    const exampleQuestions = wrapper.findAll('.example-question')
    await exampleQuestions[0].trigger('click')

    // Then
    const messages = wrapper.findAll('.message')
    expect(messages[0].text()).toContain(expectedQuestion)
  })

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

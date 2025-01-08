<template>
  <div class="chatbot-container">
    <header class="chatbot-header">
      <h1>Ask NERON</h1>
      <p class="disclaimer">
        NERON est basé sur un
        <a href="https://fr.wikipedia.org/wiki/Grand_mod%C3%A8le_de_langage" class="disclaimer-link"
          >grand modèle de language</a
        >
        et peut donc faire des erreurs. Vérifiez toujours les sources fournies et si besoin des
        sources externes.
      </p>
    </header>

    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.type === 'user' ? 'user-message' : 'bot-message']"
      >
        <div class="avatar">
          <div v-if="message.type === 'user'" class="user-avatar">
            <img src="../assets/user_avatar.png" alt="User Avatar" />
          </div>
          <div v-else class="bot-avatar">
            <img src="../assets/neron_avatar.gif" alt="NERON Avatar" />
          </div>
        </div>
        <div class="message-content">
          <p>{{ message.text }}</p>
          <div v-if="message.documents" class="documents">
            <div class="documents-header" @click="toggleDocuments(index)">
              <span>Sources ({{ message.documents.length }})</span>
              <span class="toggle-icon" :class="{ 'is-open': openDocuments[index] }">▼</span>
            </div>
            <div v-show="openDocuments[index]" class="documents-content">
              <div v-for="(doc, docIndex) in message.documents" :key="docIndex" class="document">
                <h3>{{ doc.metadata.title }}</h3>
                <p>{{ doc.content }}</p>
                <a :href="doc.metadata.link" target="_blank" class="source-link">
                  Source: {{ doc.metadata.source }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="loading-message">
        <div class="loading-spinner"></div>
        <span>NERON réfléchit...</span>
      </div>
    </div>

    <div class="chat-input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Posez votre question..."
        :disabled="isLoading"
      />
      <button @click="sendMessage" :disabled="isLoading || !userInput.trim()">Envoyer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

const userInput = ref('')
const messages = ref([])
const isLoading = ref(false)
const messagesContainer = ref(null)
const openDocuments = ref({})

const toggleDocuments = (index) => {
  openDocuments.value[index] = !openDocuments.value[index]
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const question = userInput.value
  messages.value.push({
    type: 'user',
    text: question,
  })

  userInput.value = ''
  isLoading.value = true
  await scrollToBottom()

  try {
    const response = await axios.post('http://46.101.95.138:3000/api/questions', {
      question,
      chatHistory: messages.value,
    })

    messages.value.push({
      type: 'assistant',
      text: response.data.answer,
      documents: response.data.retrieved_documents,
    })

    // Set the new documents section to be closed by default
    openDocuments.value[messages.value.length - 1] = false
  } catch (error) {
    const errorMessage = error.message.includes('Failed to fetch')
      ? "Impossible de contacter NERON. Assurez-vous que l'API est en cours d'exécution sur http://localhost:3000"
      : "Désolé, une erreur s'est produite. Veuillez réessayer plus tard."

    messages.value.push({
      type: 'bot',
      text: errorMessage,
    })
    console.error('Error:', error)
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<style scoped>
@keyframes twinkle {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

@keyframes moveStars {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

.chatbot-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 800px;
  background: linear-gradient(to bottom, #090a61, #122270);
  color: #c2f3fc;
  font-family: 'eKanit', 'Segoe UI', 'Lucida Grande', 'Trebuchet MS', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
}

@media (min-height: 800px) {
  .chatbot-container {
    height: 90vh;
    margin: 5vh 0;
  }
}

.disclaimer {
  font-size: 0.8rem;
  color: #a6eefb;
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

.disclaimer-link {
  color: #84e100;
  text-decoration: none;
}

.disclaimer-link:hover {
  text-decoration: underline;
}

.chatbot-container::before,
.chatbot-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 160px 120px, #ffffff, rgba(0, 0, 0, 0));
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.3;
  animation: moveStars 60s linear infinite;
  pointer-events: none;
}

.chatbot-container::after {
  background-position: 100px 100px;
  animation: moveStars 90s linear infinite;
}

.chatbot-header {
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  text-align: center;
  border-bottom: 2px solid rgba(255, 66, 89, 1);
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(255, 66, 89, 0.3);
}

.chatbot-header h1 {
  margin: 0;
  color: rgba(255, 66, 89, 1);
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(255, 66, 89, 0.5);
  font-weight: 700;
  font-family: 'Days-One', 'Segoe UI', 'Lucida Grande', 'Trebuchet MS', Arial, sans-serif;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.message {
  display: flex;
  gap: 1rem;
  max-width: 80%;
  animation: fadeIn 0.3s ease-in;
}

.avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.user-avatar img,
.bot-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  flex-grow: 1;
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.user-message .message-content {
  background: rgba(255, 66, 89, 0.15);
  border: 1px solid rgba(255, 66, 89, 1);
}

.bot-message {
  align-self: flex-start;
}

.bot-message .message-content {
  background: rgba(32, 129, 226, 0.15);
  border: 1px solid #2081e2;
}

.documents {
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.documents-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 0.5rem;
  transition: background-color 0.3s ease;
}

.documents-header:hover {
  background: rgba(0, 0, 0, 0.3);
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.toggle-icon.is-open {
  transform: rotate(180deg);
}

.documents-content {
  margin-top: 0.5rem;
  animation: slideDown 0.3s ease-out;
}

.document {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border: 1px solid rgba(32, 129, 226, 0.3);
  transition: all 0.3s ease;
}

.document:hover {
  border-color: rgba(255, 66, 89, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 66, 89, 0.2);
}

.document h3 {
  color: rgba(255, 66, 89, 1);
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.source-link {
  display: inline-block;
  margin-top: 0.8rem;
  color: #84e100;
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  padding: 0.4rem 0.8rem;
  background: rgba(132, 225, 0, 0.1);
  border-radius: 4px;
}

.source-link:hover {
  background: rgba(132, 225, 0, 0.2);
  transform: translateY(-1px);
}

.chat-input {
  padding: 1.2rem;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  gap: 0.8rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.chat-input input {
  flex: 1;
  padding: 1rem;
  border: 1px solid #2081e2;
  border-radius: 4px;
  background: rgba(9, 10, 97, 0.8);
  color: #c2f3fc;
  font-family: inherit;
  transition: all 0.3s ease;
}

.chat-input input:focus {
  outline: none;
  border-color: rgba(255, 66, 89, 1);
  box-shadow: 0 0 10px rgba(255, 66, 89, 0.3);
  background: rgba(9, 10, 97, 0.95);
}

.chat-input button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(255, 66, 89, 1), #cf1830);
  border: none;
  border-radius: 4px;
  color: #fff;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.chat-input button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.chat-input button:hover:not(:disabled)::before {
  left: 100%;
}

.chat-input button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 66, 89, 0.4);
}

.chat-input button:disabled {
  background: #333;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-message {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #84e100;
  background: rgba(132, 225, 0, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  margin: 0.5rem 0;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(132, 225, 0, 0.2);
  border-top-color: #84e100;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
  background: #2081e2;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 66, 89, 1);
}

@media (max-width: 800px) {
  .chatbot-container {
    height: 100vh;
    width: 100vw;
    max-width: none;
  }

  .message {
    max-width: 90%;
  }
}
</style>

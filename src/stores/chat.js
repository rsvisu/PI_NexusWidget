import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import config from '@/config/app'

// # Constantes:
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
})

// # Store:
export const useChatStore = defineStore('chat', () => {
  // ## Variables:
  const messages = ref([])
  const isLoading = ref(false)
  const conversation_token = ref(null)
  // Mapa de votos por id de mensaje: { [message_id]: 'positive' | 'negative' }
  const feedback = ref({})
  // Saludo inicial; empieza con el respaldo local y se sobrescribe con el del backend
  const greeting = ref(config.chat.greeting)

  // ## Funciones privadas:
  function _addMessage(content, sender_type, id = null) {
    messages.value.push({
      index: messages.value.length + 1,
      id,
      sender_type,
      content
    })
  }

  function _generateConversationToken() {
    conversation_token.value = crypto.randomUUID()
  }

  function _resetLocalState() {
    messages.value = [greeting.value]
    feedback.value = {}
    _generateConversationToken()
  }

  async function _deleteHistory() {
    if (!conversation_token.value) return

    try {
      await api.delete(`/api/chat/history/${conversation_token.value}`)
    } catch (error) {
      console.error("Error al borrar el historial:", error)
    } finally {
      // Limpiamos el estado local aunque falle la petición
      _resetLocalState()
    }
  }

  // ## Funciones:
  // Carga el saludo configurado en el dashboard; si falla, se queda el respaldo local
  async function loadWidgetConfig() {
    try {
      const response = await api.get('/api/config/public')
      greeting.value = {
        content: response.data.greeting,
        sender_type: 'assistant',
      }
    } catch (error) {
      console.error("Error al cargar la configuración del widget:", error)
    }
  }

  async function loadMessages() {
    if (!conversation_token.value) {
      _generateConversationToken()
    }

    try {
      const response = await api.get(`/api/chat/history/${conversation_token.value}`)
      messages.value = [greeting.value, ...response.data.messages]
    } catch (error) {
      if (error.response?.status === 404) {
        // Primera visita, no hay conversación todavía
        messages.value = [greeting.value]
      } else {
        console.error("Error al cargar el historial:", error)
      }
    }
  }

  async function sendMessage(message) {
    message = message.trim()
    if (!message) return

    _addMessage(message, "user")
    isLoading.value = true

    try {
      const response = await api.post(`/api/chat`, {
        message: message,
        conversation_token: conversation_token.value
      })

      // Guardamos el id para poder votar la respuesta después
      _addMessage(response.data.content, "assistant", response.data.id)

    } catch (error) {
      console.error("Error al comunicarse con el backend:", error)
      _addMessage("Lo siento, tengo problemas de conexión ahora mismo. Por favor, inténtalo más tarde.", "assistant")
    } finally {
      isLoading.value = false
    }
  }

  async function sendFeedback(message_id, vote) {
    // El saludo inicial y los mensajes de usuario no tienen id, no se votan
    if (!message_id) return

    // Actualizamos la UI antes de confirmar en el backend (optimistic update)
    const previousVote = feedback.value[message_id]
    feedback.value[message_id] = vote

    try {
      await api.post('/api/chat/feedback', {
        message_id,
        vote,
        conversation_token: conversation_token.value
      })
    } catch (error) {
      console.error("Error al enviar el feedback:", error)
      if (previousVote) {
        feedback.value[message_id] = previousVote
      } else {
        delete feedback.value[message_id]
      }
    }
  }

  // Reinicia el chat sin tocar el consentimiento ni el historial del backend
  function newConversation() {
    _resetLocalState()
  }

  async function forgetData() {
    localStorage.removeItem('nexus/chat')
    await _deleteHistory()
  }

  // conversation_token y feedback se exponen para que el plugin los persista en localStorage
  return { messages, isLoading, conversation_token, feedback, loadWidgetConfig, loadMessages, sendMessage, sendFeedback, newConversation, forgetData }
}, {
  persist: {
    key: 'nexus/chat',
    pick: ['conversation_token', 'feedback'],
  }
})

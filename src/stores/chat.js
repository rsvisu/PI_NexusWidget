import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// # Constantes:
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
})
const GREETING = { content: "¡Hola! Soy el asistente de Los Enlaces, ¿en qué puedo ayudarte?", sender_type: "assistant" }

// # Store:
export const useChatStore = defineStore('chat', () => {
  // ## Variables:
  const messages = ref([])
  const isLoading = ref(false)
  const conversation_token = ref(null)

  // ## Funciones Privadas:
  function _addMessage(content, sender_type) {
    messages.value.push({
      index: messages.value.length + 1,
      sender_type,
      content
    })
  }

  function _generateConversationToken() {
    conversation_token.value = crypto.randomUUID()
  }

  async function _deleteHistory() {
    if (!conversation_token.value) return

    try {
      await api.delete(`/api/chat/history/${conversation_token.value}`)
    } catch (error) {
      console.error("Error al borrar el historial:", error)
    } finally {
      // Limpiamos el estado local aunque falle la petición
      messages.value = [GREETING]
      _generateConversationToken()
    }
  }

  // ## Funciones:
  async function loadMessages() {
    // Generamos un token de conversación si no existe
    if (!conversation_token.value) {
      _generateConversationToken()
    }

    // Recuperamos el historial
    try {
      const response = await api.get(`/api/chat/history/${conversation_token.value}`)
      messages.value = [GREETING, ...response.data.messages]
    } catch (error) {
      if (error.response?.status === 404) {
        // Primera visita, no hay conversación todavía
        messages.value = [GREETING]
      } else {
        console.error("Error al cargar el historial:", error)
      }
    }
  }

  async function sendMessage(message) {
    // Validación
    message = message.trim()
    if (!message) return

    // Añadimos el mensaje del usuario
    _addMessage(message, "user")

    // Activamos la carga
    isLoading.value = true

    try {
      // Petición al backend
      const response = await api.post(`/api/chat`, {
        message: message,
        conversation_token: conversation_token.value
      })

      // Añadimos la respuesta de la IA
      _addMessage(response.data.content, "assistant")

    } catch (error) {
      console.error("Error al comunicarse con el backend:", error)
      _addMessage("Lo siento, tengo problemas de conexión ahora mismo. Por favor, inténtalo más tarde.", "assistant")
    } finally {
      isLoading.value = false
    }
  }

  async function forgetData() {
    localStorage.removeItem('nexus/chat')
    await _deleteHistory()
  }

  // conversation_token se expone solo para que el plugin de persistencia lo guarde en localStorage
  return { messages, isLoading, conversation_token, loadMessages, sendMessage, forgetData }
}, {
  persist: {
    key: 'nexus/chat',
    pick: ['conversation_token'],
  }

})



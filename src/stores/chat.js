import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Variables:
const API_URL = "http://localhost:3000"
const GREETING = { content: "¡Hola! Soy el asistente de Los Enlaces, ¿en qué puedo ayudarte?", sender_type: "assistant" }

// Funciones:
function forgetStoredData() {
  localStorage.removeItem('nexus/chat')
  globalThis.location.reload()
}

// Store:
export const useChatStore = defineStore('chat', () => {
  // Variables:
  const messages = ref([])
  const isLoading = ref(false)
  const conversation_token = ref(null)

  // Funciones:
  function _addMessage(content, sender_type) {
    messages.value.push({
      index: messages.value.length + 1,
      sender_type,
      content
    })
  }

  async function loadMessages() {
    // Generamos un token de conversación si no existe
    if (!conversation_token.value) {
      conversation_token.value = crypto.randomUUID()
    }

    // Recuperamos el historial
    try {
      const response = await axios.get(`${API_URL}/api/chat/history/${conversation_token.value}`)
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
      const response = await axios.post(`${API_URL}/api/chat`, {
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

  return { messages, isLoading, conversation_token, loadMessages, sendMessage, forgetStoredData }
}, {
  persist: {
    key: 'nexus/chat',
    pick: ['conversation_token'],
  }

})



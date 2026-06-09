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
  // Votos emitidos, indexados por id de mensaje: { [message_id]: 'positive' | 'negative' }
  const feedback = ref({})

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

      // Añadimos la respuesta de la IA con su id para poder votarla después
      _addMessage(response.data.content, "assistant", response.data.id)

    } catch (error) {
      console.error("Error al comunicarse con el backend:", error)
      _addMessage("Lo siento, tengo problemas de conexión ahora mismo. Por favor, inténtalo más tarde.", "assistant")
    } finally {
      isLoading.value = false
    }
  }

  async function sendFeedback(message_id, vote) {
    // El saludo inicial y los mensajes del usuario no tienen id, no se votan
    if (!message_id) return

    // Aplicamos el voto en la UI de forma optimista antes de confirmarlo en el backend
    const previous = feedback.value[message_id]
    feedback.value[message_id] = vote

    try {
      await api.post('/api/chat/feedback', {
        message_id,
        vote,
        conversation_token: conversation_token.value
      })
    } catch (error) {
      console.error("Error al enviar el feedback:", error)
      // Revertimos el voto si el backend lo rechaza
      if (previous) {
        feedback.value[message_id] = previous
      } else {
        delete feedback.value[message_id]
      }
    }
  }

  async function forgetData() {
    localStorage.removeItem('nexus/chat')
    // Los votos pertenecen a la conversación que se borra
    feedback.value = {}
    await _deleteHistory()
  }

  // conversation_token y feedback se exponen para que el plugin los guarde en localStorage
  return { messages, isLoading, conversation_token, feedback, loadMessages, sendMessage, sendFeedback, forgetData }
}, {
  persist: {
    key: 'nexus/chat',
    pick: ['conversation_token', 'feedback'],
  }

})



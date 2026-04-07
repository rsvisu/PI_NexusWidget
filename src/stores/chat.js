import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

function forgetStoredData() {
  localStorage.removeItem('nexus/chat')
  globalThis.location.reload()
}

export const useChatStore = defineStore('chat', () => {
  // Variables:
  const messages = ref([
    {
      id: 1,
      content: "¡Hola! Soy el asistente de Los Enlaces, ¿en qué puedo ayudarte?",
      role: "assistant",
    }
  ])

  const isLoading = ref(false)

  // Funciones:
  function _addMessage(text, role) {
    messages.value.push({
      id: messages.value.length + 1,
      role: role,
      content: text
    })
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
      const response = await axios.post('http://localhost:3000/api/chat', {
        message: message,
        history: messages.value
      })

      // Añadimos la respuesta de la IA
      _addMessage(response.data.reply, "assistant")

    } catch (error) {
      console.error("Error al comunicarse con el backend:", error)
      _addMessage("Lo siento, tengo problemas de conexión ahora mismo. Por favor, inténtalo más tarde.", "assistant")
    } finally {
      isLoading.value = false
    }
  }

  return { messages, isLoading, sendMessage, forgetStoredData }
}, {
  persist: {
    key: 'nexus/chat'
  }

})



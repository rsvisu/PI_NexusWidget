import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([
    {
      id: 1,
      senderType: "assistant",
      content: "Hola!, soy el asistente de Los Enlaces, ¿en que puedo ayudarte?"
    }
  ])

  function addMessage(text, senderType) {
    messages.value.push({
      id: messages.value.length + 1,
      senderType: senderType,
      content: text
    })

  }

  return { messages, addMessage }
})



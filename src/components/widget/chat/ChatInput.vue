<script setup>
import { useWidgetStore } from '@/stores/widget'
import { useChatStore } from '@/stores/chat'
import { nextTick, ref, watch } from 'vue'
import Send from '~icons/material-symbols/send-rounded'

// Stores:
const widget = useWidgetStore()
const chat = useChatStore()

// Variables:
const messageText = ref('')

// Referencias al DOM:
const messageInputRef = ref(null)

// Watchers:
// Enfocar el textarea cuando se abra el chat
watch(
  () => widget.isOpen,
  (isOpen) => {
    // Si el widget se esta abriendo, enfocamos el input
    if (isOpen) {
      // Esperamos hasta el siguiente tick para esperar a que este disponible
      nextTick(() => {
        messageInputRef.value?.focus()
      })
    }
  },
)

// Funciones:
// Autoajustar la altura del textarea
function autoResize() {
  const textarea = messageInputRef.value

  if (!textarea) return

  textarea.style.height = 'auto'
  nextTick(() => {
    textarea.style.height = `${textarea.scrollHeight}px`
  })
}

// Manejar el enter del textarea para envío del mensaje
function handleEnterButton(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault() // Evitar salto de línea
    handleSend()
  }
}

// Manejar el envio del mensaje
function handleSend() {
  if (!messageText.value.trim()) return

  sendMessage(messageText.value.trim())
  messageText.value = ''
  autoResize()  // Ajustar la altura después de limpiar el mensaje
}

// Enviar el mensaje
function sendMessage(message) {
  message = message.trim()
  // TODO: Implementar lógica para enviar el mensaje
  chat.addMessage(message, "user")
  console.log(chat.messages)
}
</script>

<template>
  <div class="p-4 border-t border-gray-200 bg-gray-100">
    <div class="flex bg-white border border-gray-300 rounded-md">
      <textarea rows="1" placeholder="Escribe tu mensaje..."
        class="w-full max-h-30 p-2 rounded-md focus:outline-none resize-none overflow-y-auto no-scrollbar"
        ref="messageInputRef" v-model="messageText" @input="autoResize" @keydown="handleEnterButton"></textarea>
      <button class="cursor-pointer px-4 ml-4 border-l border-gray-300 hover:bg-gray-50 transition-colors"
        @click="handleSend">
        <Send class="text-brand size-8" />
      </button>
    </div>
  </div>
</template>

<style>
/* Scrollbar */
/* Para Chrome, Safari y Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Para IE, Edge y Firefox */
.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>

<script setup>
import { useChatStore } from '@/stores/chat'
import GreetingBubble from '../messages/GreetingBubble.vue'
import MessageBubble from '../messages/MessageBubble.vue'
import TypingIndicator from '../messages/TypingIndicator.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useWidgetStore } from '@/stores/widget'

// Stores:
const chat = useChatStore()
const widget = useWidgetStore()

// Referencias al DOM:
const chatContainerRef = ref(null)

// Las sugerencias solo se muestran mientras no haya ningún mensaje del usuario
const visibleSuggestions = computed(() => {
  if (chat.messages.some(msg => msg.sender_type === 'user')) {
    return []
  }
  return chat.suggestions
})

// Funciones:
async function scrollToBottom(smooth = true) {
  await nextTick()

  chatContainerRef.value.scrollTo({
    top: chatContainerRef.value.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  })
}

// Watchers:
watch(
  () => chat.messages.length,
  () => scrollToBottom(),
)

watch(
  () => widget.isOpen,
  (isOpen) => {
    if (isOpen) {
      scrollToBottom(false)
    }
  },
)
</script>

<template>
  <div class="flex-1 min-h-0 flex flex-col p-4 py-2 overflow-y-scroll" ref="chatContainerRef">
    <!-- Primer mensaje: saludo con sugerencias integradas -->
    <GreetingBubble
      v-if="chat.messages.length > 0"
      :message="chat.messages[0].content"
      :suggestions="visibleSuggestions"
      @suggestion-click="chat.sendMessage"
    />

    <!-- Resto de mensajes de la conversación -->
    <MessageBubble
      v-for="(message, i) in chat.messages.slice(1)"
      :key="message.id ?? i"
      :message="message.content"
      :role="message.sender_type"
      :message-id="message.id ?? null"
      :vote="chat.feedback[message.id] ?? null"
      :sources="message.sources"
      @feedback="(vote) => chat.sendFeedback(message.id, vote)"
    />

    <TypingIndicator v-if="chat.isLoading" />
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chat'
import MessageBubble from '../messages/MessageBubble.vue'
import TypingIndicator from '../messages/TypingIndicator.vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useWidgetStore } from '@/stores/widget'

// Stores:
const chat = useChatStore()
const widget = useWidgetStore()

// Referencias al DOM:
const chatContainerRef = ref(null)

// Las sugerencias se muestran solo mientras el usuario no haya enviado ningún mensaje
const showSuggestions = computed(() => {
  return chat.suggestions.length > 0 && !chat.messages.some(msg => msg.sender_type === 'user')
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
    <MessageBubble v-for="(message, i) in chat.messages" :key="message.id ?? i" :message="message.content"
      :role="message.sender_type" :message-id="message.id ?? null" :vote="chat.feedback[message.id] ?? null"
      @feedback="(vote) => chat.sendFeedback(message.id, vote)" />

    <!-- Sugerencias de bienvenida: solo antes de la primera pregunta del usuario -->
    <div v-if="showSuggestions" class="flex flex-wrap gap-2 mt-3">
      <button
        v-for="suggestion in chat.suggestions"
        :key="suggestion"
        type="button"
        class="text-sm px-3 py-1.5 rounded-full border border-brand text-brand hover:bg-brand hover:text-white transition-colors cursor-pointer"
        @click="chat.sendMessage(suggestion)"
      >
        {{ suggestion }}
      </button>
    </div>

    <TypingIndicator v-if="chat.isLoading" />
  </div>
</template>

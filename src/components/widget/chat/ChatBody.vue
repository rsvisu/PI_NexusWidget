<script setup>
import { useChatStore } from '@/stores/chat'
import MessageBubble from '../messages/MessageBubble.vue'
import TypingIndicator from '../messages/TypingIndicator.vue'
import MessageBubble from '../messages/MessageBubble.vue';

// Stores:
const chat = useChatStore()

</script>

<template>
  <div class="flex-1 min-h-0 flex flex-col p-4 py-2 overflow-y-auto">
    <MessageBubble
      v-for="message in chat.messages"
      :key="message.id"
      :message="message.content"
      :role="message.role"
    />
    <TypingIndicator v-if="chat.isLoading" />
  </div>
</template>

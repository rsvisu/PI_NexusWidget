<script setup>
import { useChatStore } from '@/stores/chat'
import MessageBubble from '../messages/MessageBubble.vue';

// Stores
const chat = useChatStore()

</script>

<template>
  <div class="flex-1 flex flex-col p-4 py-2 overflow-y-scroll">
    <MessageBubble
      v-for="(message, id) in chat.messages"
      :key="id"
      :message="message.content"
      :senderType="message.senderType"
    />
  </div>
</template>
